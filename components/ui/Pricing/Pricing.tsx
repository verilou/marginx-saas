'use client';

import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { BillingInterval, Price, PricingProps } from '@/types/types_props';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Pricing({
  user,
  products,
  subscription
}: PricingProps) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return (
      <section>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <Tabs defaultValue="month" className="self-center mt-6">
              <TabsList className="flex w-fit m-auto">
                {intervals.includes('month') && (
                  <TabsTrigger
                    value="month"
                    onClick={() => setBillingInterval('month')}
                  >
                    Monthly billing
                  </TabsTrigger>
                )}
                {intervals.includes('year') && (
                  <TabsTrigger
                    onClick={() => setBillingInterval('year')}
                    value="year"
                  >
                    Yearly billing
                  </TabsTrigger>
                )}
              </TabsList>
              <div className="mt-12 flex flex-col md:flex-row gap-8">
                {products.map((product) => {
                  const price = product?.prices?.find(
                    (price) => price.interval === billingInterval
                  );
                  if (!price) return null;
                  const priceString = new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: price.currency!,
                    minimumFractionDigits: 0
                  }).format((price?.unit_amount || 0) / 100);

                  return (
                    <Card key={product.id} className="flex flex-col basis-1/2">
                      <CardHeader>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="mb-10 flex-grow">
                        <span className="text-5xl font-extrabold">
                          {priceString}
                        </span>
                        <span className="text-base font-medium">
                          /{billingInterval}
                        </span>
                      </CardContent>
                      <CardFooter className="flex">
                        {priceIdLoading === price.id ? (
                          <Button disabled className="w-fit">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleStripeCheckout(price)}
                            className="w-full"
                          >
                            {subscription ? 'Manage' : 'Subscribe'}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </Tabs>
          </div>
        </div>
      </section>
    );
  }
}
