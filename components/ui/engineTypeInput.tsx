import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import React from 'react';

const fuel_mapping = {
  '1': 'petrol',
  '2': 'diesel',
  '3': 'LPG',
  '4': 'electric',
  '5': 'other',
  '6': 'hybrid',
  '7': 'CNG'
};

interface InputProps {
  onValueChange: (value: string) => void;
}

export function EngineTypeInput({ onValueChange }: InputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="engineType">Engine Type</Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger id="engineType">
          <SelectValue placeholder="Select engine type" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(fuel_mapping).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
