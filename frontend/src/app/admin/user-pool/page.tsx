"use client";

import { useFindManyUser, useCountUser } from "@/lib/hooks";
import { useState } from "react";
import type { Prisma } from "@zenstackhq/runtime/models";
import ResponsivePagination from "react-responsive-pagination";
import Skeleton from "react-loading-skeleton";
import AddUserButton from "./_components/AddUser";
import UserCard from "./_components/UserCard";
import SearchBox from "../_components/SearchBox";

const PAGE_COUNT = 10;

export default function UserPoolPage() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  // Filter for users that are "fake users" (identified by FU in idNumber)
  const whereClause: Prisma.UserWhereInput = {
    idNumber: {
      startsWith: "FU-",
    },
    ...(searchText && {
      OR: [
        {
          email: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      ],
    }),
  };

  const { data: usersCount } = useCountUser(
    {
      where: whereClause,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: users, isLoading } = useFindManyUser(
    {
      where: whereClause,
      take: PAGE_COUNT,
      skip: (page - 1) * PAGE_COUNT,
      orderBy: {
        createdAt: "desc",
      },
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const totalPages = Math.ceil((usersCount || 0) / PAGE_COUNT);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Pool</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage fake passengers for testing and demo purposes
          </p>
        </div>
        <AddUserButton />
      </div>

      <SearchBox
        value={searchText}
        onChange={(value) => {
          setSearchText(value);
          setPage(1);
        }}
        placeholder="Search by name or email..."
      />

      {isLoading && (
        <div className="mt-5">
          <Skeleton className="mt-5" height={"20px"} />
          <Skeleton className="mt-5" height={100} count={PAGE_COUNT} />
        </div>
      )}

      {!isLoading && usersCount !== undefined && usersCount > 0 && (
        <p className="mt-5 h-[20px] inline-block text-gray-600">
          {usersCount} user{usersCount !== 1 ? "s" : ""} in pool
        </p>
      )}

      {!isLoading && users && users.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-gray-500">No users in the pool yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Click &quot;Add User to Pool&quot; to create a fake passenger
          </p>
        </div>
      )}

      {!isLoading && users && (
        <ul role="list" className="mt-4 space-y-4">
          {users?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              page={page}
              whereClause={whereClause}
            />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <div className="mt-5">
          <ResponsivePagination
            current={page}
            total={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}
