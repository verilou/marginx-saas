'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';
import { Tables } from '@/types_db';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../card';
import { Button } from '../../button';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency || '€',
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Card>
      <div className="mt-8 mb-4 text-xl font-semibold"></div>
      <CardHeader>
        <CardTitle>Your Plan</CardTitle>
        <CardDescription>
          {subscription
            ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
            : 'You are not currently subscribed to any plan.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {subscription ? (
            `${subscriptionPrice}/${subscription?.prices?.interval}`
          ) : (
            <Link href="/">Choose your plan</Link>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleStripePortalRequest} loading={isSubmitting}>
          Open customer portal
        </Button>
      </CardFooter>
    </Card>
  );
}
