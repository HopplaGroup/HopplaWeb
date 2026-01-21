"use client";

import { useState, useEffect } from "react";
import { useFormWithServerAction } from "@/hooks/useFormWithServerAction";
import addRide from "./_actions/addRide";
import addRideSchema, { addRideErrorMapClient } from "./_schemas/addRideSchema";
import { useFindManyUser, useFindManyRule } from "@/lib/hooks";
import type { Prisma } from "@zenstackhq/runtime/models";
import type { User } from "@prisma/client";
import {
  Car,
  MapPin,
  Circle,
  Calendar,
  DollarSign,
  Users,
  Search,
  X,
  CheckCircle,
  Wand2,
  Shield,
  Check,
} from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { Autocomplete } from "@/components/ui/autocomplete";
import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

type UserWithCars = Prisma.UserGetPayload<{
  include: {
    cars: true;
    driverVerificationRequest: true;
  };
}>;

export default function AddRidePage() {
  const [driverSearch, setDriverSearch] = useState("");
  const [driverSearchDebounced] = useDebounce(driverSearch, 300);
  const [passengerSearch, setPassengerSearch] = useState("");
  const [passengerSearchDebounced] = useDebounce(passengerSearch, 300);

  const [selectedDriver, setSelectedDriver] = useState<UserWithCars | null>(
    null
  );
  const [selectedPassengers, setSelectedPassengers] = useState<User[]>([]);
  const [selectedFromPlace, setSelectedFromPlace] = useState<Place | null>(null);
  const [selectedToPlace, setSelectedToPlace] = useState<Place | null>(null);
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [selectedRuleIds, setSelectedRuleIds] = useState<string[]>([]);

  // Fetch all available rules
  const { data: allRules, isLoading: isLoadingRules } = useFindManyRule();

  const { form, clientErrors, handleSubmit, loading, reset } =
    useFormWithServerAction(
      addRide,
      addRideSchema,
      addRideErrorMapClient,
      {
        driverId: "",
        carId: "",
        from: "",
        to: "",
        departure: new Date(),
        price: 15,
        distance: 0,
        duration: 0,
        passengerIds: [],
        ruleIds: [],
      },
      {
        onSuccess: () => {
          toast.success("Ride created successfully!");
          reset();
          setSelectedDriver(null);
          setSelectedPassengers([]);
          setSelectedFromPlace(null);
          setSelectedToPlace(null);
          setAutocompleteKey((prev) => prev + 1);
          setSelectedRuleIds([]);
        },
        onError: (_, err) => {
          console.error(err);
        },
        showErrorToast: true,
        showSuccessToast: false,
      }
    );

  const { setValue, watch } = form;
  const selectedCarId = watch("carId");
  const price = watch("price");
  const departure = watch("departure");

  // Get the selected car's capacity
  const selectedCar = selectedDriver?.cars.find((c) => c.id === selectedCarId);
  const requiredSeats = selectedCar?.capacity || 0;
  const seatsAreFull = selectedPassengers.length === requiredSeats && requiredSeats > 0;

  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Fetch all available drivers for auto-fill (only from Driver Pool)
  const { data: allDrivers } = useFindManyUser(
    {
      where: {
        idNumber: { startsWith: "FD-" },
        driverVerificationRequest: {
          status: "APPROVED",
        },
        cars: {
          some: {
            status: "APPROVED",
          },
        },
      },
      include: {
        cars: {
          where: { status: "APPROVED" },
        },
        driverVerificationRequest: true,
      },
      take: 50,
    },
    { enabled: true }
  );

  // Fetch all available passengers for auto-fill (only from User Pool)
  const { data: allPassengers } = useFindManyUser(
    {
      where: {
        idNumber: { startsWith: "FU-" },
        status: "ACTIVE",
      },
      take: 100,
    },
    { enabled: true }
  );

  // Popular routes for auto-fill
  const POPULAR_ROUTES = [
    { from: "relation:1996871", to: "relation:2009237" }, // Tbilisi -> Batumi
    { from: "relation:2009237", to: "relation:1996871" }, // Batumi -> Tbilisi
    { from: "relation:1996871", to: "relation:2024547" }, // Tbilisi -> Kutaisi
    { from: "relation:2024547", to: "relation:1996871" }, // Kutaisi -> Tbilisi
    { from: "relation:1996871", to: "relation:1997305" }, // Tbilisi -> Rustavi
    { from: "relation:2024547", to: "relation:2009237" }, // Kutaisi -> Batumi
  ];

  // Auto-fill function
  const handleAutoFill = () => {
    if (!allDrivers || allDrivers.length === 0) {
      toast.error("No drivers found in Driver Pool");
      return;
    }
    if (!allPassengers || allPassengers.length === 0) {
      toast.error("No users found in User Pool");
      return;
    }

    setIsAutoFilling(true);

    try {
      // Pick a random driver with a car
      const driversWithCars = allDrivers.filter(
        (d) => (d as UserWithCars).cars?.length > 0
      ) as UserWithCars[];
      
      if (driversWithCars.length === 0) {
        toast.error("No drivers with cars found");
        setIsAutoFilling(false);
        return;
      }

      const randomDriver =
        driversWithCars[Math.floor(Math.random() * driversWithCars.length)];
      const randomCar =
        randomDriver.cars[Math.floor(Math.random() * randomDriver.cars.length)];

      // Get passengers (excluding driver)
      const availablePassengers = allPassengers.filter(
        (p) => p.id !== randomDriver.id
      );

      if (availablePassengers.length < randomCar.capacity) {
        toast.error(
          `Not enough users in User Pool. Need ${randomCar.capacity}, only ${availablePassengers.length} available.`
        );
        setIsAutoFilling(false);
        return;
      }

      // Shuffle and pick passengers to fill seats
      const shuffled = [...availablePassengers].sort(() => Math.random() - 0.5);
      const selectedPax = shuffled.slice(0, randomCar.capacity);

      // Pick random route
      const randomRoute =
        POPULAR_ROUTES[Math.floor(Math.random() * POPULAR_ROUTES.length)];
      
      // Find the place objects for the route
      const fromPlace = PLACES.find((p) => p.osm === randomRoute.from) || null;
      const toPlace = PLACES.find((p) => p.osm === randomRoute.to) || null;

      // Set random departure (1-7 days from now)
      const departureDate = new Date();
      departureDate.setDate(
        departureDate.getDate() + Math.floor(Math.random() * 7) + 1
      );
      departureDate.setHours(
        6 + Math.floor(Math.random() * 14), // 6 AM to 8 PM
        Math.random() > 0.5 ? 0 : 30,
        0,
        0
      );

      // Random price between 10-50
      const randomPrice = Math.floor(Math.random() * 40) + 10;

      // Randomly select 1-3 rules if rules exist
      let randomRuleIds: string[] = [];
      if (allRules && allRules.length > 0) {
        const numRules = Math.min(
          Math.floor(Math.random() * 3) + 1,
          allRules.length
        );
        const shuffledRules = [...allRules].sort(() => Math.random() - 0.5);
        randomRuleIds = shuffledRules.slice(0, numRules).map((r) => r.id);
      }

      // Set all values
      setSelectedDriver(randomDriver);
      setSelectedPassengers(selectedPax);
      setSelectedFromPlace(fromPlace);
      setSelectedToPlace(toPlace);
      setSelectedRuleIds(randomRuleIds);
      setValue("driverId", randomDriver.id);
      setValue("carId", randomCar.id);
      setValue("from", randomRoute.from);
      setValue("to", randomRoute.to);
      setValue("departure", departureDate);
      setValue("price", randomPrice);
      setValue("ruleIds", randomRuleIds);
      
      // Increment key to force Autocomplete re-render with new values
      setAutocompleteKey((prev) => prev + 1);

      toast.success("Form auto-filled!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to auto-fill");
    } finally {
      setIsAutoFilling(false);
    }
  };

  // Search for drivers (only from Driver Pool)
  const { data: drivers, isLoading: isLoadingDrivers } = useFindManyUser(
    {
      where: {
        idNumber: { startsWith: "FD-" },
        driverVerificationRequest: {
          status: "APPROVED",
        },
        cars: {
          some: {
            status: "APPROVED",
          },
        },
        ...(driverSearchDebounced && {
          OR: [
            {
              name: { contains: driverSearchDebounced, mode: "insensitive" },
            },
            {
              email: { contains: driverSearchDebounced, mode: "insensitive" },
            },
          ],
        }),
      },
      include: {
        cars: {
          where: { status: "APPROVED" },
        },
        driverVerificationRequest: true,
      },
      take: 10,
    },
    { enabled: driverSearchDebounced.length > 0 || !selectedDriver }
  );

  // Search for passengers (only from User Pool)
  const { data: potentialPassengers, isLoading: isLoadingPassengers } =
    useFindManyUser(
      {
        where: {
          idNumber: { startsWith: "FU-" },
          status: "ACTIVE",
          id: {
            notIn: [
              selectedDriver?.id || "",
              ...selectedPassengers.map((p) => p.id),
            ].filter(Boolean),
          },
          ...(passengerSearchDebounced && {
            OR: [
              {
                name: {
                  contains: passengerSearchDebounced,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: passengerSearchDebounced,
                  mode: "insensitive",
                },
              },
            ],
          }),
        },
        take: 10,
      },
      { enabled: passengerSearchDebounced.length > 0 }
    );

  // Update form when driver is selected
  useEffect(() => {
    if (selectedDriver) {
      setValue("driverId", selectedDriver.id);
      // Auto-select first car if available
      if (selectedDriver.cars.length > 0) {
        setValue("carId", selectedDriver.cars[0].id);
      }
    }
  }, [selectedDriver, setValue]);

  // Update form when passengers change
  useEffect(() => {
    setValue(
      "passengerIds",
      selectedPassengers.map((p) => p.id)
    );
  }, [selectedPassengers, setValue]);

  // Update form when rules change
  useEffect(() => {
    setValue("ruleIds", selectedRuleIds);
  }, [selectedRuleIds, setValue]);

  const addPassenger = (user: User) => {
    if (!selectedPassengers.find((p) => p.id === user.id)) {
      // Don't allow adding more passengers than car capacity
      if (requiredSeats > 0 && selectedPassengers.length >= requiredSeats) {
        toast.error(`Car only has ${requiredSeats} seats`);
        return;
      }
      setSelectedPassengers([...selectedPassengers, user]);
    }
    setPassengerSearch("");
  };

  const removePassenger = (userId: string) => {
    setSelectedPassengers(selectedPassengers.filter((p) => p.id !== userId));
  };

  const selectDriver = (driver: UserWithCars) => {
    setSelectedDriver(driver);
    setDriverSearch("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Ride</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create a pre-filled ride with driver and passengers
          </p>
        </div>
        <button
          type="button"
          onClick={handleAutoFill}
          disabled={isAutoFilling}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-medium hover:from-violet-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          <Wand2 className="w-4 h-4" />
          {isAutoFilling ? "Filling..." : "Auto Fill"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Driver Selection */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            Driver & Vehicle
            <span className="text-xs text-gray-400 font-normal">(from Driver Pool)</span>
          </h2>

          {selectedDriver ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedDriver.profileImg}
                  alt={selectedDriver.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {selectedDriver.name}
                  </p>
                  <p className="text-sm text-gray-500">{selectedDriver.email}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedDriver(null);
                  setValue("driverId", "");
                  setValue("carId", "");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={driverSearch}
                  onChange={(e) => setDriverSearch(e.target.value)}
                  placeholder="Search driver pool..."
                  className="flex-1 outline-none"
                />
              </div>
              {driverSearchDebounced && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {isLoadingDrivers ? (
                    <div className="p-3 text-center text-gray-500">
                      Loading...
                    </div>
                  ) : drivers && drivers.length > 0 ? (
                    drivers.map((driver) => (
                      <button
                        key={driver.id}
                        type="button"
                        onClick={() => selectDriver(driver as UserWithCars)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={driver.profileImg}
                          alt={driver.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{driver.name}</p>
                          <p className="text-xs text-gray-500">{driver.email}</p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {(driver as UserWithCars).cars?.length || 0} car(s)
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">
                      No drivers found in Driver Pool
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {clientErrors.driverId && (
            <p className="text-red-500 text-sm mt-1">{clientErrors.driverId}</p>
          )}

          {/* Car Selection */}
          {selectedDriver && selectedDriver.cars.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Vehicle
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDriver.cars.map((car) => (
                  <button
                    key={car.id}
                    type="button"
                    onClick={() => setValue("carId", car.id)}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      selectedCarId === car.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <p className="font-medium text-sm">{car.name}</p>
                    <p className="text-xs text-gray-500">
                      {car.mark} • {car.plate} • {car.capacity} seats
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {clientErrors.carId && (
            <p className="text-red-500 text-sm mt-1">{clientErrors.carId}</p>
          )}
        </div>

        {/* Route Selection */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Route
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Circle className="w-3 h-3 inline mr-1" />
                From
              </label>
              <Autocomplete
                key={`from-${autocompleteKey}`}
                items={PLACES}
                defaultSelected={selectedFromPlace || undefined}
                displayValue={(item) => item.name[languageTag()]}
                onChange={(place) => {
                  setSelectedFromPlace(place);
                  setValue("from", place?.osm || "");
                }}
                getKey={(item) => item.osm}
                filterItems={(items, query) =>
                  items.filter(
                    (item) =>
                      item.name.en
                        .toLowerCase()
                        .startsWith(query.toLowerCase()) ||
                      item.name.ka.toLowerCase().startsWith(query.toLowerCase())
                  )
                }
                placeholder="Select departure..."
              />
              {clientErrors.from && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.from}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-3 h-3 inline mr-1" />
                To
              </label>
              <Autocomplete
                key={`to-${autocompleteKey}`}
                items={PLACES}
                defaultSelected={selectedToPlace || undefined}
                displayValue={(item) => item.name[languageTag()]}
                onChange={(place) => {
                  setSelectedToPlace(place);
                  setValue("to", place?.osm || "");
                }}
                getKey={(item) => item.osm}
                filterItems={(items, query) =>
                  items.filter(
                    (item) =>
                      item.name.en
                        .toLowerCase()
                        .startsWith(query.toLowerCase()) ||
                      item.name.ka.toLowerCase().startsWith(query.toLowerCase())
                  )
                }
                placeholder="Select destination..."
              />
              {clientErrors.to && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.to}</p>
              )}
            </div>
          </div>
        </div>

        {/* Time and Price */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Time & Price
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departure Time
              </label>
              <DatePicker
                value={departure}
                startDate={new Date()}
                endDate={new Date(new Date().getFullYear() + 1, 11, 31)}
                isHour
                placeholder="Select date and time..."
                onChange={(date) => setValue("departure", date || new Date())}
              />
              {clientErrors.departure && (
                <p className="text-red-500 text-sm mt-1">
                  {clientErrors.departure}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-3 h-3 inline mr-1" />
                Price per seat (GEL)
              </label>
              <input
                type="number"
                value={price || ""}
                onChange={(e) =>
                  setValue("price", parseFloat(e.target.value) || 0)
                }
                min={0}
                step={0.5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="15.00"
              />
              {clientErrors.price && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.price}</p>
              )}
            </div>
          </div>
        </div>

        {/* Rules Selection */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Ride Rules
            <span className="text-xs text-gray-400 font-normal">(optional)</span>
          </h2>

          {isLoadingRules ? (
            <div className="text-center py-4 text-gray-500">Loading rules...</div>
          ) : !allRules || allRules.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No rules found. Please add rules in the{" "}
              <a href="/admin/rules" className="text-primary underline">
                Rules Admin
              </a>{" "}
              page first.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {allRules.map((rule) => {
                const isSelected = selectedRuleIds.includes(rule.id);
                const labels = rule.labels as { en: string; ka: string };
                return (
                  <button
                    key={rule.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedRuleIds(selectedRuleIds.filter((id) => id !== rule.id));
                      } else {
                        setSelectedRuleIds([...selectedRuleIds, rule.id]);
                      }
                    }}
                    className={`flex items-center gap-2 p-3 border-2 rounded-xl text-sm cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-gray-50 border-gray-200 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    <div
                      className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                    {rule.svg && (
                      // eslint-disable-next-line react/no-danger
                      <div
                        className="w-4 h-4 fill-current"
                        dangerouslySetInnerHTML={{ __html: rule.svg }}
                      />
                    )}
                    <span className="text-left">{labels[languageTag()]}</span>
                  </button>
                );
              })}
            </div>
          )}

          {selectedRuleIds.length > 0 && (
            <p className="text-sm text-gray-500 mt-3">
              {selectedRuleIds.length} rule{selectedRuleIds.length !== 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        {/* Passenger Selection */}
        <div className="bg-white rounded-lg border p-4">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Passengers
            <span className="text-xs text-gray-400 font-normal">(from User Pool)</span>
          </h2>

          {/* Selected passengers */}
          {selectedPassengers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedPassengers.map((passenger) => (
                <div
                  key={passenger.id}
                  className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={passenger.profileImg}
                    alt={passenger.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{passenger.name}</span>
                  <button
                    type="button"
                    onClick={() => removePassenger(passenger.id)}
                    className="hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Passenger search */}
          <div className="relative">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={passengerSearch}
                onChange={(e) => setPassengerSearch(e.target.value)}
                placeholder="Search user pool..."
                className="flex-1 outline-none"
              />
            </div>
            {passengerSearchDebounced && (
              <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {isLoadingPassengers ? (
                  <div className="p-3 text-center text-gray-500">Loading...</div>
                ) : potentialPassengers && potentialPassengers.length > 0 ? (
                  potentialPassengers.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => addPassenger(user)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user.profileImg}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    No users found in User Pool
                  </div>
                )}
              </div>
            )}
          </div>
          {clientErrors.passengerIds && (
            <p className="text-red-500 text-sm mt-1">
              {clientErrors.passengerIds}
            </p>
          )}
          
          {/* Seat status indicator */}
          <div className="mt-3 flex items-center gap-2">
            <div
              className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                seatsAreFull
                  ? "bg-green-100 text-green-700"
                  : requiredSeats > 0
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {requiredSeats > 0 ? (
                <>
                  {selectedPassengers.length} / {requiredSeats} seats filled
                  {seatsAreFull && " ✓"}
                </>
              ) : (
                "Select a car first"
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 items-center">
          {!seatsAreFull && requiredSeats > 0 && (
            <span className="text-amber-600 text-sm">
              Fill all {requiredSeats} seats to create ride
            </span>
          )}
          <button
            type="submit"
            disabled={loading || !seatsAreFull}
            className={`px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors ${
              loading || !seatsAreFull ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Ride"}
          </button>
        </div>
      </form>
    </div>
  );
}
