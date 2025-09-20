'use client';
import { useFindManyRule } from '@/lib/hooks';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { languageTag } from '@/paraglide/runtime';
import * as m from '@/paraglide/messages.js';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, ChevronDown, Check } from 'lucide-react';

export default function RulesFilter({ search }: { search: any }) {
  const [ruleIds, setRuleIds] = useQueryState(
    'rules',
    parseAsArrayOf(parseAsString)
  );
  const [open, setOpen] = useState(false);

  const { data: rules } = useFindManyRule();

  const getSelectedCount = () => {
    return ruleIds?.length || 0;
  };
  return (
    <div>
      <div className="block lg:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                {m.clean_neat_polecat_aid()}
                {getSelectedCount() > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {getSelectedCount()}
                  </span>
                )}
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerDescription className="space-y-2 overflow-auto h-full max-h-[400px]">
                {rules?.map((rule: any) => (
                  <div
                    key={rule.id}
                    onClick={() => {
                      const isChecked = ruleIds?.includes(rule.id);
                      setRuleIds(
                        !isChecked
                          ? [...(ruleIds || []), rule.id]
                          : ruleIds
                          ? ruleIds.filter((id) => id !== rule.id)
                          : []
                      );
                      setOpen(false);
                      search();
                    }}
                    className={`flex items-center p-4 w-full border-2 rounded-xl text-sm cursor-pointer transition-all duration-200 ${
                      ruleIds?.includes(rule.id)
                        ? 'bg-primary/5 border-primary text-primary'
                        : 'bg-gray-50 border-gray-200 hover:border-primary/30 hover:bg-primary/2'
                    }`}
                  >
                    <div
                      className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        ruleIds?.includes(rule.id)
                          ? 'border-primary bg-primary'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {ruleIds?.includes(rule.id) && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 ">
                      {rule.svg && (
                        <div
                          className={`w-5 h-5 flex-shrink-0 ${
                            ruleIds?.includes(rule.id)
                              ? 'text-primary/70'
                              : 'text-gray-400'
                          }`}
                          dangerouslySetInnerHTML={{ __html: rule.svg }}
                        />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          ruleIds?.includes(rule.id)
                            ? 'text-primary'
                            : 'text-gray-700'
                        }`}
                      >
                        {rule.labels[languageTag()].length > 30
                          ? rule.labels[languageTag()].slice(0, 30) + '...'
                          : rule.labels[languageTag()]}
                      </span>
                    </div>
                  </div>
                ))}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  დახურვა
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden lg:block">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="pt-0 pb-3 hover:no-underline group">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg border border-transparent group-hover:bg-gray-200 transition-colors duration-200">
                    <Settings className="h-4 w-4 text-gray-800" />
                    <span className="text-sm font-medium text-gray-800">
                      {m.clean_neat_polecat_aid()}
                    </span>
                  </div>
                  {getSelectedCount() > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                      {getSelectedCount()} {m.proof_seemly_horse_twirl()}
                    </span>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                {rules?.map((rule: any) => (
                  <div
                    key={rule.id}
                    onClick={() => {
                      const isChecked = ruleIds?.includes(rule.id);
                      setRuleIds(
                        !isChecked
                          ? [...(ruleIds || []), rule.id]
                          : ruleIds
                          ? ruleIds.filter((id) => id !== rule.id)
                          : []
                      );
                      search();
                    }}
                    className={`flex items-center p-4 w-full border-2 rounded-xl text-sm cursor-pointer transition-all duration-200 ${
                      ruleIds?.includes(rule.id)
                        ? 'bg-primary/5 border-primary text-primary'
                        : 'bg-gray-50 border-gray-200 hover:border-primary/30 hover:bg-primary/2'
                    }`}
                  >
                    {/* <div
                      className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        ruleIds?.includes(rule.id)
                          ? 'border-primary bg-primary'
                          : 'border-gray-300 bg-white'
                      }`}
                    >
                      {ruleIds?.includes(rule.id) && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div> */}
                    <div className="flex items-center gap-2 ">
                      {rule.svg && (
                        <div
                          className={`w-5 h-5 flex-shrink-0 opacity-70 ${
                            ruleIds?.includes(rule.id)
                              ? 'text-primary/70'
                              : 'text-gray-400'
                          }`}
                          dangerouslySetInnerHTML={{ __html: rule.svg }}
                        />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          ruleIds?.includes(rule.id)
                            ? 'text-primary'
                            : 'text-gray-700'
                        }`}
                      >
                        {rule.labels[languageTag()]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
