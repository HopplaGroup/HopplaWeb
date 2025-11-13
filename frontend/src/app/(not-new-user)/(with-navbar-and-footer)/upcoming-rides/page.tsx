import React from 'react';
import { Separator } from '@/components/ui/separator';
// import RideCard from "../_components/ride-card";
import { notFound, redirect } from 'next/navigation';

import * as m from '@/paraglide/messages.js';
// import { RideResponse } from "../response-ride-type";
import { getUser } from '@/lib/utils/auth';
import db from '@/lib/utils/db';
import { menv } from '@/lib/utils/menv';
import { RideResponse } from '../search/response-ride-type';
import RideCard from '../search/_components/ride-card';

export default async function CurrentRidesPage() {
  const user = await getUser();

  if (!user) {
    redirect(
      `/api/auth/register?connection_id=${menv.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE}`
    );
  }

  const userId = user.id;

  const currentRides = await db.ride.findMany({
    where: {
      status: 'ACTIVE',
      OR: [
        {
          driverId: userId,
        },
        {
          ridePassengerRequests: {
            some: {
              passengerId: userId,
              status: {
                in: ['ACCEPTED', 'PENDING'],
              },
            },
          },
        },
      ],
    },
    include: {
      car: true,
      driver: true,
      ridePassengerRequests: {
        include: {
          passenger: true,
        },
        where: {
          status: 'ACCEPTED',
        },
      },
      rideRules: {
        include: {
          rule: true,
        },
      },
    },
  });

  if (!currentRides) {
    notFound();
  }

  // Transform the data
  const mappedCurrentRides: RideResponse[] = currentRides.map((ride) => ({
    availableSeats: ride.availableSeats,
    departure: ride.departure,
    distance: ride.distance,
    to: ride.to,
    duration: ride.duration,
    from: ride.from,
    id: ride.id,
    price: String(ride.price),
    car: {
      id: ride.car.id,
      type: ride.car.type,
    },
    driver: {
      id: ride.driver.id,
      name: ride.driver.name,
      profileImg: ride.driver.profileImg,
      averageRating: 0,
    },
    passengers: ride.ridePassengerRequests.map((passenger) => ({
      id: passenger.passenger.id,
      name: passenger.passenger.name,
      profileImg: passenger.passenger.profileImg,
    })),
    rules: ride.rideRules.map((rule) => ({
      id: rule.id,
      labels: rule.rule.labels,
      svg: rule.rule.svg,
    })),
  }));

  // Sort rides (driver's rides first)
  const sortedRides = [...mappedCurrentRides].sort((a, b) => {
    if (a.driver.id === userId) return -1;
    if (b.driver.id === userId) return 1;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-3xl font-bold text-center mt-6 text-gray-900">
        {m.full_same_gecko_express()}
      </div>
      <Separator className="my-6" />

      {sortedRides.length > 0 ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {sortedRides.map((ride) => (
            <div key={ride.id} className="bg-white rounded-xl shadow-lg">
              <RideCard ride={ride} showDate />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-900 p-8 bg-white rounded-xl max-w-4xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
                <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
                <path d="M12 12v6" />
                <path d="M8 21v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
                <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {m.cuddly_small_samuel_pride()}
          </h3>
          <p className="text-gray-600">{m.least_born_butterfly_commend()}</p>
        </div>
      )}
    </div>
  );
}
