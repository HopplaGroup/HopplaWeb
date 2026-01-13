"use client";

import { Button } from "@/components/ui/button";
import { getQueryKey, useDeleteUser } from "@/lib/hooks";
import { Prisma } from "@zenstackhq/runtime/models";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Car, Trash2, User } from "lucide-react";

type DriverWithCars = Prisma.UserGetPayload<{
  include: {
    cars: true;
    driverVerificationRequest: true;
  };
}>;

export default function DriverCard({
  driver,
  page,
  whereClause,
}: {
  driver: DriverWithCars;
  page: number;
  whereClause: Prisma.UserWhereInput;
}) {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const driversQueryKey = getQueryKey("User", "findMany", {
    where: whereClause,
    include: {
      cars: true,
      driverVerificationRequest: true,
    },
    take: 10,
    skip: (page - 1) * 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this driver?")) return;

    setIsDeleting(true);
    const toastId = toast.loading("Deleting driver...");

    deleteUser(
      { where: { id: driver.id } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: driversQueryKey });
          toast.success("Driver deleted successfully", { id: toastId });
        },
        onError: () => {
          toast.error("Failed to delete driver", { id: toastId });
        },
        onSettled: () => {
          setIsDeleting(false);
        },
      }
    );
  };

  const car = driver.cars[0]; // Get the first car

  return (
    <li className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-primary/50 transition-colors">
      <div className="p-4">
        {/* Driver Info */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              src={driver.profileImg}
              alt={driver.name}
            />
            <div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <p className="font-medium text-gray-900">{driver.name}</p>
              </div>
              <p className="text-sm text-gray-500">{driver.email}</p>
              <p className="text-xs text-gray-400">{driver.mobileNumber}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            disabled={isDeleting}
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Car Info */}
        {car && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm text-gray-700">
                Vehicle Details
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Brand</p>
                <p className="text-gray-700">{car.mark}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Model</p>
                <p className="text-gray-700">{car.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Plate</p>
                <p className="text-gray-700 font-mono">{car.plate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Capacity</p>
                <p className="text-gray-700">{car.capacity} seats</p>
              </div>
            </div>

            {car.photos.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {car.photos.slice(0, 4).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${car.name} ${index + 1}`}
                    className="w-16 h-16 rounded-md object-cover flex-shrink-0 border border-gray-200"
                  />
                ))}
                {car.photos.length > 4 && (
                  <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500 text-sm">
                    +{car.photos.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Meta Info */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>
            Created: {new Date(driver.createdAt).toLocaleDateString()}
          </span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            Verified Driver
          </span>
        </div>
      </div>
    </li>
  );
}
