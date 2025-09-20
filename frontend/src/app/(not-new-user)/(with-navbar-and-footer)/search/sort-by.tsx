'use client';
import { defaultSortBy, sortByOptions } from '@/lib/constants/search';
import { languageTag } from '@/paraglide/runtime';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import * as m from '@/paraglide/messages.js';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useState } from 'react';
import {
  ChevronDown,
  Star,
  DollarSign,
  Clock,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from 'lucide-react';

export default function SortBy({ search }: { search: any }) {
  const [orderBy, setOrderBy] = useQueryState(
    'sortBy',
    parseAsString.withDefault(defaultSortBy)
  );

  const [_, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [open, setOpen] = useState(false);

  const getIcon = (value: string) => {
    if (value.includes('driverAverageRating')) {
      return <Star className="h-4 w-4" />;
    }
    if (value.includes('price:asc')) {
      return (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4" />
          <ArrowUp className="h-3 w-3" />
        </div>
      );
    }
    if (value.includes('price:desc')) {
      return (
        <div className="flex items-center">
          <DollarSign className="h-4 w-4" />
          <ArrowDown className="h-3 w-3" />
        </div>
      );
    }
    if (value.includes('departure')) {
      return <Clock className="h-4 w-4" />;
    }
    return null;
  };

  const getCurrentLabel = () => {
    const current = sortByOptions.find((option) => option.value === orderBy);
    return current
      ? current.label[languageTag()]
      : sortByOptions[0].label[languageTag()];
  };

  const handleChange = (value: string) => {
    setPage(1);
    setOrderBy(value);
    setOpen(false);
    search();
  };

  return (
    <div>
      {/* Mobile */}
      <div className="block lg:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {getCurrentLabel()}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerDescription className="space-y-2">
                {sortByOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={orderBy === option.value ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2"
                    onClick={() => handleChange(option.value)}
                  >
                    {getIcon(option.value)}
                    {option.label[languageTag()]}
                  </Button>
                ))}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">დახურვა</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="pt-0 pb-3 hover:no-underline group">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg border border-transparent group-hover:bg-gray-200 transition-colors duration-200">
                    <ArrowUpDown className="h-4 w-4 text-gray-800" />
                    <span className="text-sm font-medium text-gray-800">
                      {m.royal_teary_cougar_edit()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium truncate max-w-32">
                    {getCurrentLabel()}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {sortByOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={orderBy === option.value ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2"
                    onClick={() => handleChange(option.value)}
                  >
                    {getIcon(option.value)}
                    {option.label[languageTag()]}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
