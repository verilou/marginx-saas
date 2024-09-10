'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { columns } from './column';
import { DataTable } from './data-table';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Activity, DollarSign } from 'lucide-react';

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com'
    },
    {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com'
    },
    {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com'
    },
    {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com'
    },
    {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com'
    }
  ];
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <div className="m-auto md:w-3/4 px-4 gap-4 flex flex-wrap">
      <div className="w-3/4">
        <Card className="max-w" x-chunk="charts-01-chunk-7">
          <CardHeader className="space-y-0 pb-0">
            <CardDescription>Base value for 10000 km</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-1xl tabular-nums">
              18456
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                €
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                time: {
                  label: 'Time',
                  color: 'hsl(var(--chart-2))'
                }
              }}
            >
              <AreaChart
                accessibilityLayer
                data={[
                  {
                    date: '2024-01-01',
                    time: 8.5
                  },
                  {
                    date: '2024-01-02',
                    time: 7.2
                  },
                  {
                    date: '2024-01-03',
                    time: 8.1
                  },
                  {
                    date: '2024-01-04',
                    time: 6.2
                  },
                  {
                    date: '2024-01-05',
                    time: 5.2
                  },
                  {
                    date: '2024-01-06',
                    time: 8.1
                  },
                  {
                    date: '2024-01-07',
                    time: 7.0
                  }
                ]}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }}
              >
                <XAxis dataKey="date" hide />
                <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
                <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-time)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="time"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="var(--color-time)"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      Time in bed
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          hr
                        </span>
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="gap-4 flex md:flex-col flex-row items-stretch">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price today</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <div>
          <Card className="max-w" x-chunk="charts-01-chunk-7">
            <CardHeader className="space-y-0 pb-0">
              <CardDescription>Base value for 10000 km</CardDescription>
              <CardTitle className="flex items-baseline gap-1 text-1xl tabular-nums">
                18456
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  €
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ChartContainer
                config={{
                  time: {
                    label: 'Time',
                    color: 'hsl(var(--chart-2))'
                  }
                }}
              >
                <AreaChart
                  accessibilityLayer
                  data={[
                    {
                      date: '2024-01-01',
                      time: 8.5
                    },
                    {
                      date: '2024-01-02',
                      time: 7.2
                    },
                    {
                      date: '2024-01-03',
                      time: 8.1
                    },
                    {
                      date: '2024-01-04',
                      time: 6.2
                    },
                    {
                      date: '2024-01-05',
                      time: 5.2
                    },
                    {
                      date: '2024-01-06',
                      time: 8.1
                    },
                    {
                      date: '2024-01-07',
                      time: 7.0
                    }
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                  }}
                >
                  <XAxis dataKey="date" hide />
                  <YAxis domain={['dataMin - 5', 'dataMax + 2']} hide />
                  <defs>
                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-time)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-time)"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="time"
                    type="natural"
                    fill="url(#fillTime)"
                    fillOpacity={0.4}
                    stroke="var(--color-time)"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Time in bed
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            hr
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Analyse a car model performance</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
