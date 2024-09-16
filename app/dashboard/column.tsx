'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CarAd, colors, engineType } from '@/types/types_analitycs';
import { ArrowUpDown, Calendar, Car, Euro, Gauge, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { colorsList } from './constants';
import { timeSince } from '@/utils/helpers';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const handleOpenNewTabs = (url: string) => {
  window.open(url, '_blank');
  window.focus();
};

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
    accessorKey: 'image_urls_small',
    header: 'Photo',
    cell: ({ row }) => {
      const photos = row.getValue('image_urls_small') as string | null;
      let photo: string = 'null';
      if (photos !== null && photos.length > 0) {
        photo = JSON.parse(photos.replace(/'/g, '"'))[0];
      }

      if (photo === 'null') {
        return (
          <img
            onClick={() => handleOpenNewTabs(row.getValue('ad_url'))}
            src="https://via.placeholder.com/150"
            alt={`${row.getValue('brand')} ${row.getValue('model')}`}
            className="w-20 cursor-pointer h-auto rounded-md"
          />
        );
      }
      return (
        <img
          src={photo}
          onClick={() => handleOpenNewTabs(row.original.ad_url)}
          alt={`${row.getValue('brand')} ${row.getValue('model')}`}
          className="w-20 h-auto cursor-pointer rounded-md"
        />
      );
    }
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
    accessorKey: 'model_year',
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
        <span>{row.getValue('model_year')}</span>
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
        {/*

          This is a workaround for a bug in the table library. Check this issue for more info and future updates:

          https://github.com/TanStack/table/issues/4382

        */}
        <span>{(row.getValue('price') as string).slice(1, -1)}</span>
        <Euro className="mr-2 h-4 w-4" />
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
        <span>{row.getValue('mileage')} km</span>
      </div>
    )
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      {
        /*

          This is a workaround for a bug in the table library. Check this issue for more info and future updates:

          https://github.com/TanStack/table/issues/4382

        */
      }
      const color = row.getValue('color') as colors;

      return (
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{
              backgroundColor: colorsList[color],
              border: 'gray 1px solid'
            }}
          />
          <span>{row.getValue('color')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'fuel',
    header: 'Engine Type',
    cell: ({ row }) => {
      /*

          This is a workaround for a bug in the table library. Check this issue for more info and future updates:

          https://github.com/TanStack/table/issues/4382

      */
      const egineTypeMap: { [key: string]: engineType } = {
        1: 'petrol',
        2: 'diesel',
        3: 'LPG',
        4: 'electric',
        5: 'other',
        6: 'hybrid',
        7: 'CNG'
      };
      const engineTypeIndex = row.getValue('fuel') as string;
      const engineType = egineTypeMap[engineTypeIndex];
      return (
        <Badge
          variant={
            engineType === 'electric'
              ? 'default'
              : engineType === 'diesel'
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
    cell: ({ row }) => {
      const gearBoxIndex = row.getValue('gearbox') as number;
      const gearBoxValue = ['Manuelle', 'Automatique'][gearBoxIndex - 1];
      return <div>{gearBoxValue}</div>;
    }
  },
  {
    accessorKey: 'city_1',
    header: 'Location',
    cell: ({ row }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() =>
            handleOpenNewTabs(
              `https://www.google.fr/maps/place/${row.original.city_1}`
            )
          }
        >
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{row.getValue('city_1')}</span>
        </div>
      );
    }
  },
  {
    accessorKey: 'published_at',
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
    cell: ({ row }) => {
      return <div>{timeSince(new Date(row.getValue('published_at')))}</div>;
    }
  }
];
