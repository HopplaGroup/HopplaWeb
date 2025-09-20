'use client';
import { Button } from '@/components/ui/button';
import { Autocomplete } from '@/components/ui/autocomplete';
import PLACES from '@/lib/constants/places';
import { languageTag } from '@/paraglide/runtime';
import { Circle, MapPin, Search } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  useQueryState,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsArrayOf,
  parseAsString,
} from 'nuqs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { useState } from 'react';
import * as m from '@/paraglide/messages.js';
export default function SearchBar({
  from,
  to,
  departure,
  availableSeats,
  setFrom,
  setTo,
  setDeparture,
  setAvailableSeats,
  search,
}: {
  from: string | null;
  to: string | null;
  departure: Date | null;
  availableSeats: number | null;
  setFrom: (from: string | null) => void;
  setTo: (to: string | null) => void;
  setDeparture: (departure: Date) => void;
  setAvailableSeats: (availableSeats: number | null) => void;
  search: () => void;
}) {
  return (
    <div className="join-md grid md:grid-cols-4">
      <Autocomplete
        startIcon={<Circle size={18} />}
        items={PLACES}
        defaultSelected={PLACES.find((place) => place.osm === from)}
        displayValue={(item) => item.name[languageTag()]}
        onChange={(place) => setFrom(place?.osm || null)}
        getKey={(item) => item.osm}
        // showMax={10}
        filterItems={(items, query) =>
          items.filter(
            (item) =>
              item.name.en.toLowerCase().startsWith(query.toLowerCase()) ||
              item.name.ka.toLowerCase().startsWith(query.toLowerCase())
          )
        }
        placeholder={m.sad_livid_octopus_express()}
      />
      <Autocomplete
        startIcon={<MapPin size={18} />}
        items={PLACES}
        defaultSelected={PLACES.find((place) => place.osm === to)}
        displayValue={(item) => item.name[languageTag()]}
        onChange={(place) => setTo(place?.osm || null)}
        getKey={(item) => item.osm}
        // showMax={10}
        filterItems={(items, query) =>
          items.filter(
            (item) =>
              item.name.en.toLowerCase().startsWith(query.toLowerCase()) ||
              item.name.ka.toLowerCase().startsWith(query.toLowerCase())
          )
        }
        placeholder={m.early_born_crow_arrive()}
      />
      <DatePicker
        startDate={new Date()}
        value={departure || undefined}
        onChange={(newDate) => newDate && setDeparture(newDate)}
      />

      <Button onClick={search} className="flex items-center gap-2">
        <Search size={18} />
        {m.day_gross_goose_heal()}
      </Button>
    </div>
  );
}
