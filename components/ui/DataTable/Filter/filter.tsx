import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CarAdFilter, carAdKey } from '@/types/types_analitycs';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import YearPickerInput from '@/components/ui/yearPickerInput';
import SelectInput from '@/components/ui/selectInput';

interface FilterFormProps {
  filterSubmit: (filters: CarAdFilter) => void;
}

export const FilterForm = ({ filterSubmit }: FilterFormProps) => {
  const [filters, setFilters] = useState<CarAdFilter>({
    title: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    engineType: '',
    gearbox: '',
    location: ''
  });

  const handleFilterChange = (key: carAdKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getFilterFiled = (key: carAdKey) => {
    switch (key) {
      case 'year':
        return (
          <YearPickerInput
            onChangeYear={(year) => {
              if (year !== null) {
                handleFilterChange(key, year.toString());
              }
            }}
          />
        );
      case 'gearbox':
        return (
          <SelectInput
            //need to be added in a constant file and translated
            placeholder="Select Gearbox"
            inputValue={['manual', 'automatic']}
            resetValue={() => handleFilterChange(key, '')}
            onValueChange={(gearbox) => {
              handleFilterChange(key, gearbox);
            }}
          />
        );
      case 'engineType':
        return (
          <SelectInput
            //need to be added in a constant file and translated
            placeholder="Select Engine Type"
            inputValue={[
              'petrol',
              'diesel',
              'LPG',
              'electric',
              'other',
              'hybrid',
              'CN'
            ]}
            resetValue={() => handleFilterChange(key, '')}
            onValueChange={(value) => {
              handleFilterChange(key, value);
            }}
          />
        );
      default:
        return (
          <Input
            value={filters[key]}
            onChange={(e) => handleFilterChange(key, e.target.value)}
            placeholder={`Enter ${key}`}
          />
        );
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Select a Car</CardTitle>
      </CardHeader>
      <CardContent className="grid lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-2 gap-4">
        {Object.entries(filters).map(([key]) => (
          <div key={key} className="flex flex-col space-y-1.5">
            <Label htmlFor={key} className="text-sm font-medium">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Label>
            {getFilterFiled(key as carAdKey)}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={() => filterSubmit(filters)} className="mt-4 w-full">
          Get Results
        </Button>
      </CardFooter>
    </Card>
  );
};
