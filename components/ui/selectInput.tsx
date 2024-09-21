import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { X } from 'lucide-react';
import React, { useState } from 'react';

interface InputProps {
  onValueChange: (value: string) => void;
  inputValue: string[];
  placeholder: string;
  resetValue: () => void;
}

export default function SelectInput({
  onValueChange,
  inputValue,
  placeholder
}: InputProps) {
  const [value, setValue] = useState('');
  const handleValueChange = (value: string) => {
    setValue(value);
    onValueChange(value);
  };
  return (
    <div className="relative space-y-2">
      <Select onValueChange={handleValueChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {inputValue.map((value) => (
            <SelectItem key={value} value={value}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-6 -top-[6px] h-full hover:bg-transparent"
          onClick={() => handleValueChange('')}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear selection</span>
        </Button>
      )}
    </div>
  );
}
