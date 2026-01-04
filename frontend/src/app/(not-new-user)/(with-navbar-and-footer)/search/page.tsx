'use client';

import { useFindManyRide } from '@/lib/hooks';
import { useQuery } from '@tanstack/react-query';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  parseAsTimestamp,
  useQueryState,
} from 'nuqs';
import { getRides } from './get-rides';
import SearchBar from './searchbar';
import SortBy from './sort-by';
import { languageTag } from '@/paraglide/runtime';
import Link from 'next/link';
import { Stars, Search, MapPin, Calendar, Users, ArrowRight, Bell } from 'lucide-react';
import * as d from 'date-fns';
import { defaultSortBy } from '@/lib/constants/search';
import { useMemo, useState } from 'react';
import RulesFilter from './rules-filter';
import { RideResponse } from './response-ride-type';
import PLACES from '@/lib/constants/places';
import RideCard from './_components/ride-card';
type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

import * as m from '@/paraglide/messages.js';
export default function SearchPage({ searchParams }: SearchPageProps) {
  const [from, setFrom] = useQueryState('from');
  const [to, setTo] = useQueryState('to');
  const [sortBy, setSortBy] = useQueryState('sortBy');
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const defaultDeparture = useMemo(
    () => new Date(new Date().setHours(0, 0, 0, 0)),
    []
  );
  const [departure, setDeparture] = useQueryState(
    'departure',
    parseAsIsoDateTime.withDefault(defaultDeparture)
  );
  const [availableSeats, setAvailableSeats] = useQueryState(
    'availableSeats',
    parseAsInteger
  );

  const [rules, setRules] = useQueryState(
    'rules',
    parseAsArrayOf(parseAsString)
  );

  const { data, isLoading } = useQuery<any, Error>({
    queryKey: [
      'rides',
      from,
      to,
      page,
      sortBy,
      departure,
      availableSeats,
      rules,
    ],
    queryFn: () =>
      getRides({
        from,
        to,
        page,
        sortBy,
        departure,
        availableSeats,
        rules,
      }),
  });

  const [_from, _setFrom] = useState(from);
  const [_to, _setTo] = useState(to);
  const [_departure, _setDeparture] = useState(departure);
  const [_availableSeats, _setAvailableSeats] = useState(availableSeats);

  const search = () => {
    setFrom(_from);
    setTo(_to);
    setDeparture(_departure);
    setAvailableSeats(_availableSeats);
  };

  return (
    <div className="container mt-4 ">
      <div>
        <SearchBar
          from={_from}
          to={_to}
          departure={_departure}
          availableSeats={_availableSeats}
          setFrom={_setFrom}
          setTo={_setTo}
          setDeparture={_setDeparture}
          setAvailableSeats={_setAvailableSeats}
          search={search}
        />
      </div>
      <div className="grid lg:grid-cols-[300px,1fr] gap-5 mt-5 items-start">
        <div className="w-full grid grid-cols-2 lg:grid-cols-1 gap-0 items-start">
          <SortBy search={search} />
          <RulesFilter search={search} />
        </div>
        <div>
          {/* Clean Title Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-600" />
                <h2 className="text-base font-medium text-gray-800">
                  {m.slow_smug_ant_love()}
                </h2>
              </div>
              {!isLoading && data && (
                <span className="text-sm text-gray-500">
                  ({data.rides.length})
                </span>
              )}
            </div>
          </div>

          {/* Compact Loading Skeleton */}
          {isLoading && (
            <div className="grid gap-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-14"></div>
                        </div>
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-12"></div>
                    </div>
                    <div className="flex gap-4 mb-3">
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {!isLoading && (
            <div className="grid gap-4">
              {data != null && data.rides.length > 0 ? (
                data.rides.map((ride: RideResponse) => (
                  <RideCard key={ride.id} ride={ride} />
                ))
              ) : (
                /* Left-aligned No Results State */
                <div className="flex items-start gap-4 py-8 px-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {m.loud_such_shad_stop()}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {m.jolly_clean_okapi_clip()}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {m.lime_lower_stork_exhale()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {m.teal_cozy_rabbit_fulfill()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Passenger Post Banner */}
          <div className="mt-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 shrink-0">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {m.drab_dull_warthog_bless()}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {m.funny_house_halibut_clap()}
                </p>
              </div>
              <Link
                href="/request-ride"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                {m.away_drab_lemming_trust()}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
