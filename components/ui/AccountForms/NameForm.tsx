'use client';

import { updateName } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../card';
import { Input } from '../../input';
import { Button } from '../../button';

export default function NameForm({ userName }: { userName: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new name is the same as the old name
    if (e.currentTarget.fullName.value === userName) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateName, router);
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Name</CardTitle>
        <CardDescription>
          Please enter your full name, or a display name you are comfortable
          with.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-8 mb-4 text-xl">
          <form id="nameForm" onSubmit={(e) => handleSubmit(e)}>
            <Input
              type="text"
              name="fullName"
              className="w-1/2 p-3"
              defaultValue={userName}
              placeholder="Your name"
              maxLength={64}
            />
          </form>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col">
          <Button type="submit" form="nameForm" loading={isSubmitting}>
            Update Name
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
