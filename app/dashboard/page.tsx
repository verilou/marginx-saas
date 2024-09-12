'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from './column';
import { DataTable } from './data-table';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { MapPin } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addGivenUrlParams } from '@/lib/utils';

interface CarAd {
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

const getData = (): CarAd[] => [
  {
    id: '1',
    photo: 'https://placehold.co/120x80',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2019,
    price: 15000,
    mileage: 30000,
    color: 'Silver',
    engineType: 'Petrol',
    gearbox: 'Automatic',
    location: 'New York',
    publishDate: '2023-05-15'
  },
  {
    id: '2',
    photo: 'https://placehold.co/120x80',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2021,
    price: 40000,
    mileage: 10000,
    color: 'Red',
    engineType: 'Electric',
    gearbox: 'Automatic',
    location: 'Los Angeles',
    publishDate: '2023-05-14'
  },
  {
    id: '3',
    photo: 'https://placehold.co/120x80',
    brand: 'Ford',
    model: 'Focus',
    year: 2020,
    price: 18000,
    mileage: 25000,
    color: 'Blue',
    engineType: 'Petrol',
    gearbox: 'Manual',
    location: 'Chicago',
    publishDate: '2023-05-13'
  },
  {
    id: '4',
    photo: 'https://placehold.co/120x80',
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    price: 55000,
    mileage: 5000,
    color: 'Black',
    engineType: 'Diesel',
    gearbox: 'Automatic',
    location: 'Miami',
    publishDate: '2023-05-12'
  },
  {
    id: '5',
    photo: 'https://placehold.co/120x80',
    brand: 'Honda',
    model: 'Civic',
    year: 2018,
    price: 14000,
    mileage: 40000,
    color: 'White',
    engineType: 'Petrol',
    gearbox: 'Manual',
    location: 'Seattle',
    publishDate: '2023-05-11'
  }
];

export default function Dashboard() {
  const data = getData();
  const [mileage, setMileage] = useState(50000);

  console.log('loaded dashboard');

  useEffect(() => {
    console.log('Data:', data);
    console.log(addGivenUrlParams('/api/analytics', { action: 'test' }));
    const fetchAnalytics = async () => {
      const response = await fetch(
        addGivenUrlParams('/api/analytics', { action: 'test' })
      );
      const data = await response.json();
      console.log('Analytics:', data);
    };
    fetchAnalytics();
  }, []);

  const priceHistoryData = [
    { name: 'Jan', total: 25000 },
    { name: 'Feb', total: 20000 },
    { name: 'Mar', total: 25200 },
    { name: 'Apr', total: 27000 },
    { name: 'May', total: 25300 },
    { name: 'Jun', total: 23000 }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Car Analytics Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search for a car model, brand or color"
          />
          <Button type="submit">Search</Button>
        </div>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Price History</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={priceHistoryData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Month
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].payload.name}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Price
                              </span>
                              <span className="font-bold">
                                ${payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#8884d8"
                  fill="url(#gradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidence Indicator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">85%</div>
            <p className="text-sm text-muted-foreground">
              Based on 500 listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ad Volume (Last Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">237</div>
            <p className="text-sm text-muted-foreground">New listings</p>
          </CardContent>
        </Card>

        <Card className="col-auto">
          <CardHeader>
            <CardTitle>Latest Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-bold">2019 Model S</p>
              <p className="text-sm">Added: 2 hours ago</p>
              <p className="text-sm font-medium">Price: $27,500</p>
              <a href="#" className="text-blue-500">
                View Details
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Estimated Price by Mileage</CardTitle>
          </CardHeader>
          <CardContent>
            <Slider
              defaultValue={[mileage]}
              max={200000}
              step={1000}
              onValueChange={(value) => setMileage(value[0])}
            />
            <div className="mt-4">
              <p className="text-sm font-medium">
                Estimated Price for {mileage}km
              </p>
              <p className="text-2xl font-bold">
                ${(25000 - mileage * 0.05).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Value Increase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-500">+3.2%</div>
            <p className="text-sm text-muted-foreground">
              Over the last 6 months
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Listed Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span className="text-xl font-bold">New York</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on listing density
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Listing Extremes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Most Expensive</p>
                <p className="text-lg font-bold">
                  $35,000 -{' '}
                  <a href="#" className="text-blue-500">
                    View Listing
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Cheapest</p>
                <p className="text-lg font-bold">
                  $18,500 -{' '}
                  <a href="#" className="text-blue-500">
                    View Listing
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="col-span-full">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
