'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

interface YearPickerProps {
  onChangeYear?: (year: number | null) => void;
}

export default function YearPickerInput({
  onChangeYear = () => {}
}: YearPickerProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [displayedYear, setDisplayedYear] = useState(currentYear);

  const changeYear = (increment: number) => {
    setDisplayedYear((prevYear) => prevYear + increment);
  };

  const selectYear = (year: number) => {
    onChangeYear(selectedYear);
    setPopoverOpen(false);
    setSelectedYear(year);
  };

  const clearSelection = () => {
    onChangeYear(null);
    setSelectedYear(null);
  };

  const years = Array.from({ length: 12 }, (_, i) => displayedYear - 5 + i);

  return (
    <Popover open={popoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between overflow-hidden text-left font-normal"
          onClick={() => setPopoverOpen((prev) => !prev)}
        >
          {selectedYear ? selectedYear : 'Select a year'}
          {selectedYear && (
            <X
              className="h-4 w-4 opacity-50 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="flex items-center justify-between p-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeYear(-12)}
            disabled={displayedYear <= 1900}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-semibold">{displayedYear}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeYear(12)}
            disabled={displayedYear >= currentYear}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 p-2">
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? 'default' : 'outline'}
              onClick={() => selectYear(year)}
              disabled={year > currentYear}
              className="w-full"
            >
              {year}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
