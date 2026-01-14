"use client";
import { useFormWithServerAction } from "@/hooks/useFormWithServerAction";
import { useState, useEffect } from "react";
import addDriver from "../_actions/addDriver";
import addDriverSchema, {
  addDriverErrorMapClient,
  AddDriverInput,
} from "../_schemas/addDriverSchema";
import { Plus, X, Shuffle } from "lucide-react";
import FormModal from "@/app/_components/forms/FormModal";
import FormField from "@/app/_components/forms/FormField";
import { CAR_LIST } from "@/lib/constants/car-list";
import { UploadForm } from "@/app/_components/AS3UploadForm";

// Random data generators
const FIRST_NAMES = [
  "Giorgi",
  "Nino",
  "Davit",
  "Mariam",
  "Luka",
  "Ana",
  "Nikoloz",
  "Tamari",
  "Sandro",
  "Elene",
  "Irakli",
  "Salome",
  "Tornike",
  "Natia",
  "Giga",
  "Maka",
];
const LAST_NAMES = [
  "Beridze",
  "Kapanadze",
  "Gelashvili",
  "Lomidze",
  "Maisuradze",
  "Tsiklauri",
  "Goglidze",
  "Khachidze",
  "Javakhishvili",
  "Chikhladze",
];
const CAR_MODELS = [
  "Camry",
  "Corolla",
  "Prius",
  "Civic",
  "Accord",
  "Model 3",
  "Golf",
  "Passat",
  "A4",
  "3 Series",
  "C-Class",
  "E-Class",
  "Tucson",
  "Sportage",
  "RAV4",
  "CX-5",
];
const YEARS = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"];
const POPULAR_CAR_BRANDS = [
  "Toyota",
  "Honda",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Mazda",
  "Nissan",
];
const BIOS = [
  "Experienced driver with a clean record. Happy to help with luggage!",
  "Professional driver, non-smoker, AC always on.",
  "Friendly driver, love good music and conversation.",
  "Safe and reliable driver. 5+ years experience.",
  "Punctual and courteous. Your comfort is my priority!",
  "",
];

// Background colors for avatars
const AVATAR_COLORS = [
  "3B82F6", // blue
  "10B981", // green
  "F59E0B", // amber
  "EF4444", // red
  "8B5CF6", // violet
  "EC4899", // pink
  "06B6D4", // cyan
  "F97316", // orange
];

// Default car images by brand (using placeholder car images)
const DEFAULT_CAR_IMAGES = [
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop",
];

function generateRandomData(): AddDriverInput {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const randomId = Math.random().toString(36).substring(2, 8);
  const bgColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

  // Generate random plate: XX-000-XX
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomDigit = () => Math.floor(Math.random() * 10);
  const plate = `${randomLetter()}${randomLetter()}-${randomDigit()}${randomDigit()}${randomDigit()}-${randomLetter()}${randomLetter()}`;

  const carBrand =
    POPULAR_CAR_BRANDS[Math.floor(Math.random() * POPULAR_CAR_BRANDS.length)];
  const carModel = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];
  const year = YEARS[Math.floor(Math.random() * YEARS.length)];
  
  const name = `${firstName} ${lastName}`;
  // Generate avatar URL with initials
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=fff&size=200&bold=true`;
  
  // Pick a random car image
  const carImage = DEFAULT_CAR_IMAGES[Math.floor(Math.random() * DEFAULT_CAR_IMAGES.length)];

  return {
    name,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${randomId}@gmail.com`,
    mobileNumber: `+995 5${Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")} ${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")} ${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    bio: BIOS[Math.floor(Math.random() * BIOS.length)],
    sex: (["MAN", "WOMAN"] as const)[Math.floor(Math.random() * 2)],
    profileImg: avatarUrl,
    carName: `${carModel} ${year}`,
    carMark: carBrand,
    carPlate: plate,
    carType: (["STANDARD", "MINIVAN"] as const)[
      Math.floor(Math.random() * 2)
    ],
    carCapacity: Math.floor(Math.random() * 4) + 2, // 2-5 seats
    carFuelType: (
      ["GASOLINE", "DIESEL", "HYBRID", "ELECTRIC", "LPG"] as const
    )[Math.floor(Math.random() * 5)],
    carPhotos: [carImage],
  };
}

export default function AddDriverButton({
  onCreated,
}: {
  onCreated?: () => void;
} = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { form, clientErrors, handleSubmit, loading, firstError, reset } =
    useFormWithServerAction(
      addDriver,
      addDriverSchema,
      addDriverErrorMapClient,
      generateRandomData(),
      {
        onSuccess: () => {
          setIsModalOpen(false);
          form.reset(generateRandomData());
          reset();
          onCreated?.();
        },
        onError: (_, err) => {
          console.error(err);
        },
        showErrorToast: true,
        showSuccessToast: true,
      }
    );

  const { register, setValue, watch } = form;
  const carPhotos = watch("carPhotos") || [];
  const carCapacity = watch("carCapacity");
  const profileImg = watch("profileImg");
  const name = watch("name");

  // Check if current image is auto-generated (ui-avatars.com)
  const isAutoGeneratedAvatar = profileImg?.includes("ui-avatars.com");

  // Update avatar when name changes (only if using auto-generated avatar)
  useEffect(() => {
    if (name && isAutoGeneratedAvatar) {
      const bgColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=fff&size=200&bold=true`;
      setValue("profileImg", avatarUrl);
    }
  }, [name, isAutoGeneratedAvatar, setValue]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset(generateRandomData());
    reset();
  };

  const fillRandomData = () => {
    const data = generateRandomData();
    form.reset(data);
  };

  const addCarPhoto = (url: string) => {
    setValue("carPhotos", [...carPhotos, url]);
  };

  const removeCarPhoto = (index: number) => {
    const newPhotos = carPhotos.filter((_, i) => i !== index);
    setValue("carPhotos", newPhotos);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          fillRandomData();
          setIsModalOpen(true);
        }}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Driver to Pool
      </button>

      {isModalOpen && (
        <FormModal
          title="Add Fake Driver with Car"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          loading={loading}
          firstError={firstError}
        >
          {/* Randomize Button */}
          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={fillRandomData}
              className="text-sm px-3 py-1.5 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-md flex items-center gap-1.5 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Randomize
            </button>
          </div>

          {/* User Information Section */}
          <div className="border-b pb-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-3">
              Driver Information
            </h4>

            <div className="space-y-3">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  {/* Current avatar preview */}
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={profileImg || "/default-pfp.jpg"}
                      alt="Avatar preview"
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    />
                    {isAutoGeneratedAvatar && (
                      <span className="absolute -bottom-1 -right-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                        Auto
                      </span>
                    )}
                  </div>
                  
                  {/* Upload custom */}
                  <div className="flex flex-col gap-2">
                    <UploadForm
                      folderName="driver-pool-profiles"
                      onSuccessfulUpload={(url) => setValue("profileImg", url)}
                      className="w-16 h-16 rounded-lg"
                      cropSize={{ width: 200, height: 200 }}
                    />
                    <span className="text-xs text-gray-500">
                      Or upload custom
                    </span>
                  </div>
                </div>
                {clientErrors.profileImg && (
                  <p className="text-red-500 text-sm mt-1">
                    {clientErrors.profileImg}
                  </p>
                )}
              </div>

              <FormField
                label="Name"
                error={clientErrors.name}
                input={
                  <input
                    {...register("name")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="John Doe"
                  />
                }
              />

              <FormField
                label="Email"
                error={clientErrors.email}
                input={
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="driver@example.com"
                  />
                }
              />

              <FormField
                label="Mobile Number"
                error={clientErrors.mobileNumber}
                input={
                  <input
                    {...register("mobileNumber")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="+995 555 123 456"
                  />
                }
              />

              <FormField
                label="Sex"
                error={clientErrors.sex}
                input={
                  <select
                    {...register("sex")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="MAN">Man</option>
                    <option value="WOMAN">Woman</option>
                    <option value="OTHER">Other</option>
                  </select>
                }
              />

              <FormField
                label="Bio (Optional)"
                error={clientErrors.bio}
                input={
                  <textarea
                    {...register("bio")}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Professional driver with 5 years of experience..."
                  />
                }
              />
            </div>
          </div>

          {/* Car Information Section */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Car Information</h4>

            <div className="space-y-3">
              <FormField
                label="Car Name/Model"
                error={clientErrors.carName}
                input={
                  <input
                    {...register("carName")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Camry 2020"
                  />
                }
              />

              <FormField
                label="Car Brand"
                error={clientErrors.carMark}
                input={
                  <select
                    {...register("carMark")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select brand...</option>
                    {CAR_LIST.map((car) => (
                      <option key={car} value={car}>
                        {car}
                      </option>
                    ))}
                  </select>
                }
              />

              <FormField
                label="License Plate"
                error={clientErrors.carPlate}
                input={
                  <input
                    {...register("carPlate")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary uppercase"
                    placeholder="AB-123-CD"
                  />
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  label="Car Type"
                  error={clientErrors.carType}
                  input={
                    <select
                      {...register("carType")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="STANDARD">Standard</option>
                      <option value="MINIVAN">Minivan</option>
                    </select>
                  }
                />

                <FormField
                  label="Capacity"
                  error={clientErrors.carCapacity}
                  input={
                    <input
                      type="number"
                      value={carCapacity || ""}
                      onChange={(e) =>
                        setValue("carCapacity", parseInt(e.target.value) || 1)
                      }
                      min={1}
                      max={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  }
                />
              </div>

              <FormField
                label="Fuel Type"
                error={clientErrors.carFuelType}
                input={
                  <select
                    {...register("carFuelType")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="GASOLINE">Gasoline</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="ELECTRIC">Electric</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="HYDROGEN">Hydrogen</option>
                    <option value="CNG">CNG</option>
                    <option value="LPG">LPG</option>
                    <option value="ETHANOL">Ethanol</option>
                  </select>
                }
              />

              {/* Car Photos Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Photos
                </label>
                <div className="flex flex-wrap gap-3 items-start">
                  {/* Existing photos */}
                  {carPhotos.map((photo, index) => (
                    <div
                      key={photo}
                      className="relative group w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt={`Car ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeCarPhoto(index)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  ))}

                  {/* Upload new photo */}
                  <UploadForm
                    folderName="driver-pool-cars"
                    onSuccessfulUpload={addCarPhoto}
                    className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300"
                    cropSize={{ width: 400, height: 300 }}
                  />
                </div>
                {clientErrors.carPhotos && (
                  <p className="text-red-500 text-sm mt-1">
                    {clientErrors.carPhotos}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Click the dashed box to add car photos (at least 1 required)
                </p>
              </div>
            </div>
          </div>
        </FormModal>
      )}
    </>
  );
}
