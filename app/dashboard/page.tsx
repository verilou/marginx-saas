'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from '../../components/ui/DataTable/column';
import { DataTable } from '../../components/ui/DataTable/data-table';
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
import { addGivenUrlParams } from '@/lib/utils';
import { AnalyticsApi, CarAd, CarAdFilter } from '@/types/types_analitycs';
import { FilterForm } from '@/components/ui/DataTable/Filter/filter';

export default function Dashboard() {
  const [ads, setAds] = useState<CarAd[]>([]);
  const [mileage, setMileage] = useState(50000);

  const fetchAnalytics = async (filter: CarAdFilter | null = null) => {
    const response = await fetch(
      addGivenUrlParams('/api/analytics', { action: 'listing', ...filter })
    );
    const data = (await response.json()) as AnalyticsApi;
    console.log('Analytics:', data.results);
    const colors: string[] = data.results.reduce((prev: string[], acc) => {
      console.log(prev);
      if (!prev.includes(acc.color) && acc.color !== null) {
        prev.push(acc.color);
      }
      return prev;
    }, []);

    console.log(colors);

    setAds(data.results);
  };

  useEffect(() => {
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

  const handleFilterChange = (filters: CarAdFilter) => {
    console.log('Filter changed', filters);
    fetchAnalytics(filters);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Car Analytics Dashboard</h1>
      <FilterForm filterSubmit={handleFilterChange} />
      <div className="grid gap-6  grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2">
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
        <div className="grid gap-6 col">
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
        </div>
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
        <Card>
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
          <DataTable columns={columns} data={ads} />
        </div>
      </div>
    </div>
  );
}
