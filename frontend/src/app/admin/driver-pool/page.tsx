"use client";

import { useFindManyUser, useCountUser } from "@/lib/hooks";
import { useState } from "react";
import { Prisma } from "@zenstackhq/runtime/models";
import ResponsivePagination from "react-responsive-pagination";
import Skeleton from "react-loading-skeleton";
import AddDriverButton from "./_components/AddDriver";
import DriverCard from "./_components/DriverCard";
import SearchBox from "../_components/SearchBox";

const PAGE_COUNT = 10;

export default function DriverPoolPage() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  // Filter for users that are "fake drivers" (identified by FD in idNumber)
  const whereClause: Prisma.UserWhereInput = {
    idNumber: {
      startsWith: "FD-",
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

  const { data: driversCount } = useCountUser(
    {
      where: whereClause,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: drivers, isLoading } = useFindManyUser(
    {
      where: whereClause,
      include: {
        cars: true,
        driverVerificationRequest: true,
      },
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

  const totalPages = Math.ceil((driversCount || 0) / PAGE_COUNT);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Pool</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage fake drivers for testing and demo purposes
          </p>
        </div>
        <AddDriverButton />
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
          <Skeleton className="mt-5" height={120} count={PAGE_COUNT} />
        </div>
      )}

      {!isLoading && driversCount !== undefined && driversCount > 0 && (
        <p className="mt-5 h-[20px] inline-block text-gray-600">
          {driversCount} driver{driversCount !== 1 ? "s" : ""} in pool
        </p>
      )}

      {!isLoading && drivers && drivers.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-gray-500">No drivers in the pool yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Click &quot;Add Driver to Pool&quot; to create a fake driver
          </p>
        </div>
      )}

      {!isLoading && drivers && (
        <ul role="list" className="mt-4 space-y-4">
          {drivers?.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver as any}
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
