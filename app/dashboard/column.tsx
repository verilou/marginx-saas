'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  ArrowUpDown,
  Calendar,
  Car,
  DollarSign,
  Gauge,
  MapPin
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface CarAd {
  id: string;
  photo: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  engineType: 'Electric' | 'Diesel' | 'Petrol';
  gearbox: 'Manual' | 'Automatic';
  location: string;
  publishDate: string;
}

export const columns: ColumnDef<CarAd>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'photo',
    header: 'Photo',
    cell: ({ row }) => (
      <img
        src={row.getValue('photo')}
        alt={`${row.getValue('brand')} ${row.getValue('model')}`}
        className="w-20 h-auto rounded-md"
      />
    )
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center">
        <Car className="mr-2 h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue('brand')}</span>
      </div>
    )
  },
  {
    accessorKey: 'model',
    header: 'Model',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('model')}</div>
    )
  },
  {
    accessorKey: 'year',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center">
        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>{row.getValue('year')}</span>
      </div>
    )
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center font-medium text-green-600">
        <DollarSign className="mr-2 h-4 w-4" />
        <span>{row.getValue('price')}</span>
      </div>
    )
  },
  {
    accessorKey: 'mileage',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Mileage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center">
        <Gauge className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>{row.getValue('mileage')} mi</span>
      </div>
    )
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className="w-4 h-4 rounded-full mr-2"
          style={{ backgroundColor: row.getValue('color') }}
        />
        <span>{row.getValue('color')}</span>
      </div>
    )
  },
  {
    accessorKey: 'engineType',
    header: 'Engine Type',
    cell: ({ row }) => {
      const engineType = row.getValue('engineType') as string;
      return (
        <Badge
          variant={
            engineType === 'Electric'
              ? 'default'
              : engineType === 'Diesel'
                ? 'secondary'
                : 'outline'
          }
        >
          {engineType}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'gearbox',
    header: 'Gearbox',
    cell: ({ row }) => <div>{row.getValue('gearbox')}</div>
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => (
      <div className="flex items-center">
        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>{row.getValue('location')}</span>
      </div>
    )
  },
  {
    accessorKey: 'publishDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Publish Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue('publishDate')}</div>
  }
];
