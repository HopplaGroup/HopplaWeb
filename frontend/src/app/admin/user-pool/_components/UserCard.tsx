"use client";

import { Button } from "@/components/ui/button";
import { getQueryKey, useDeleteUser } from "@/lib/hooks";
import type { Prisma } from "@zenstackhq/runtime/models";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2, User } from "lucide-react";

export default function UserCard({
  user,
  page,
  whereClause,
}: {
  user: Prisma.UserGetPayload<object>;
  page: number;
  whereClause: Prisma.UserWhereInput;
}) {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const usersQueryKey = getQueryKey("User", "findMany", {
    where: whereClause,
    take: 10,
    skip: (page - 1) * 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setIsDeleting(true);
    const toastId = toast.loading("Deleting user...");

    deleteUser(
      { where: { id: user.id } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: usersQueryKey });
          toast.success("User deleted successfully", { id: toastId });
        },
        onError: () => {
          toast.error("Failed to delete user", { id: toastId });
        },
        onSettled: () => {
          setIsDeleting(false);
        },
      }
    );
  };

  return (
    <li className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-primary/50 transition-colors">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              src={user.profileImg}
              alt={user.name}
            />
            <div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400">{user.mobileNumber}</p>
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

        {user.bio && (
          <p className="mt-3 text-sm text-gray-600 italic">&quot;{user.bio}&quot;</p>
        )}

        {/* Meta Info */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>
            Created: {new Date(user.createdAt).toLocaleDateString()}
          </span>
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            Passenger
          </span>
        </div>
      </div>
    </li>
  );
}
