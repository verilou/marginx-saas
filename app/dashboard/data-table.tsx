'use client';
import React, { useCallback } from 'react';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState
} from '@tanstack/react-table';
import { ChevronDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const [filters, setFilters] = React.useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    engineType: '',
    gearbox: '',
    location: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    table.getColumn(key)?.setFilterValue(value);
  };

  const FilterForm = useCallback(
    () => (
      <div className="grid gap-4">
        <h4 className="font-medium leading-none">Filter Cars</h4>
        <div className="grid gap-2">
          <div className="grid items-center gap-1.5">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="h-8"
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              className="h-8"
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="h-8"
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="price">Max Price</Label>
            <Input
              id="price"
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="h-8"
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="mileage">Max Mileage</Label>
            <Input
              id="mileage"
              value={filters.mileage}
              onChange={(e) => handleFilterChange('mileage', e.target.value)}
              className="h-8"
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="engineType">Engine Type</Label>
            <Input
              id="engineType"
              value={filters.engineType}
              onChange={(e) => handleFilterChange('engineType', e.target.value)}
              className="h-8"
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="gearbox">Gearbox</Label>
            <Input
              id="gearbox"
              value={filters.gearbox}
              onChange={(e) => handleFilterChange('gearbox', e.target.value)}
              className="h-8"
            />
          </div>
          <div className="grid items-center gap-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="h-8"
            />
          </div>
        </div>
      </div>
    ),
    [filters, handleFilterChange]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Used Car Listings</CardTitle>
        <CardDescription>
          Browse and filter through our selection of quality used cars.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {/* Desktop Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="hidden sm:flex">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <FilterForm />
              </PopoverContent>
            </Popover>
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filter Cars</SheetTitle>
                  <SheetDescription>
                    Adjust your search criteria to find the perfect car.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <FilterForm />
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <div className="w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground text-center sm:text-left">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
