import { Button } from '@/components/ui/button';
import { columns } from './column';
import { DataTable } from './data-table';

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
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-1xl font-extrabold text-white sm:text-6xl">
            Welcome to the dashboard
          </h1>
          <p className="max-w-2xl mt-5 text-xl text-zinc-200 sm:text-2xl">
            All the informations you need.
          </p>
        </div>
        <div className="mt-5">
          <DataTable columns={columns} data={data} />
        </div>
        <Button variant="ghost">Secondary</Button>
      </div>
    </section>
  );
}
