// components/RideCard.tsx
import Link from 'next/link';
import { format } from 'date-fns';
import { Car, Caravan, Divide, Stars, Users } from 'lucide-react';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

import { RideResponse } from '../response-ride-type';
import PLACES from '@/lib/constants/places';
import { languageTag } from '@/paraglide/runtime';
import { cn } from '@/lib/utils/cn';
import { enUS, ka } from 'date-fns/locale';

type RideCardProps = {
  ride: RideResponse;
  forceCompact?: boolean;
  showDate?: boolean;
};

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const paddedHours = hours.toString().padStart(2, '0');
  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
};

import * as m from '@/paraglide/messages.js';

const RideCard: React.FC<RideCardProps> = ({
  ride,
  forceCompact = false,
  showDate = false,
}) => {
  const maxSeats = ride.availableSeats;
  const takenSeats = ride.passengers.length;
  const isFull = maxSeats == takenSeats;
  const locale = languageTag() === 'ka' ? ka : enUS;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 group">
      <Link href={`/rides/${ride.id}`}>
        <div className="p-5">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-800">
                  {format(ride.departure, 'd MMMM', { locale })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Seats indicator */}
              <div
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg border',
                  isFull
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-gray-100 border-gray-200 text-gray-700'
                )}
              >
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {takenSeats}/{maxSeats}
                </span>
              </div>

              {/* Price */}
              <div className="text-right">
                {Number(ride.price) > 0 ? (
                  <div className="text-2xl font-bold text-gray-800">
                    {ride.price} ₾
                  </div>
                ) : (
                  <div className="text-lg font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                    {m.such_zippy_grizzly_pave()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Route Section */}
          <div className="mb-5">
            {/* Mobile Route Design */}
            <div className={forceCompact ? 'block' : 'block lg:hidden'}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-7 bg-gray-100 rounded-lg">
                    <span className="text-sm font-semibold text-gray-800">
                      {format(new Date(ride.departure), 'HH:mm')}
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {
                        PLACES.find((p) => p.osm === ride.from)?.name[
                          languageTag()
                        ]
                      }
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-5">
                  <div className="w-px h-4 bg-gray-300"></div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-7 bg-gray-100 rounded-lg">
                    <span className="text-sm font-semibold text-gray-800">
                      {format(
                        new Date(
                          new Date(ride.departure).getTime() +
                            ride.duration * 1000
                        ),
                        'HH:mm'
                      )}
                    </span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {
                        PLACES.find((p) => p.osm === ride.to)?.name[
                          languageTag()
                        ]
                      }
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Route Design */}
            {!forceCompact && (
              <div className="hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-10 bg-gray-100 rounded-lg mb-2">
                      <span className="text-lg font-bold text-gray-800">
                        {format(new Date(ride.departure), 'HH:mm')}
                      </span>
                    </div>
                    <div className="font-medium text-gray-800">
                      {
                        PLACES.find((p) => p.osm === ride.from)?.name[
                          languageTag()
                        ]
                      }
                    </div>
                  </div>

                  <div className="flex-1 relative">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      <div className="flex-1 mx-3 relative">
                        <div className="w-full border-b-2 border-gray-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-white px-2 text-sm text-gray-500 font-medium">
                            {formatDuration(ride.duration)}
                          </span>
                        </div>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-10 bg-gray-100 rounded-lg mb-2">
                      <span className="text-lg font-bold text-gray-800">
                        {format(
                          new Date(
                            new Date(ride.departure).getTime() +
                              ride.duration * 1000
                          ),
                          'HH:mm'
                        )}
                      </span>
                    </div>
                    <div className="font-medium text-gray-800">
                      {
                        PLACES.find((p) => p.osm === ride.to)?.name[
                          languageTag()
                        ]
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Driver and Rules Section */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Car Type Icon */}
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                  {ride.car.type === 'STANDARD' && (
                    <Car className="w-4 h-4 text-gray-600" />
                  )}
                  {ride.car.type === 'MINIVAN' && (
                    <Caravan className="w-4 h-4 text-gray-600" />
                  )}
                </div>

                {/* Driver Info */}
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  src={ride.driver.profileImg}
                  alt="Driver avatar"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {ride.driver.name.split(' ')[0]}
                  </p>
                  {ride.driver.averageRating > 0 && (
                    <div className="flex items-center gap-1">
                      <Stars className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-600">
                        {ride.driver.averageRating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rules */}
              <div className="flex items-center gap-2">
                {ride.rules.length > 0 ? (
                  ride.rules.slice(0, 3).map(({ labels, id, svg }) => (
                    <div
                      key={id}
                      className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors"
                    >
                      <div
                        className="w-4 h-4 fill-gray-600 text-gray-600"
                        dangerouslySetInnerHTML={{ __html: svg }}
                      />
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                    {m.mushy_north_mole_harbor()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RideCard;
