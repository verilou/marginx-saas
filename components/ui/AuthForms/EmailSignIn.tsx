'use client';

import Link from 'next/link';
import { signInWithEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface EmailSignInProps {
  allowPassword: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function EmailSignIn({
  allowPassword,
  redirectMethod,
  disableButton
}: EmailSignInProps) {
  const t = useTranslations('EmailSignIn');
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signInWithEmail, router);
    setIsSubmitting(false);
  };

  return (
    <div>
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label htmlFor="email">{t('email')}</label>
            <Input
              id="email"
              placeholder={t('emailPlaceholder')}
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <Button
            type="submit"
            className="mt-1"
            disabled={disableButton}
            loading={isSubmitting}
          >
            {t('signIn')}
          </Button>
        </div>
      </form>
      {allowPassword && (
        <>
          <p>
            <Link href="/signin/password_signin" className="font-light text-sm">
              {t('signInWithPassword')}
            </Link>
          </p>
          <p>
            <Link href="/signin/signup" className="font-light text-sm">
              {t('noAccount')}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
