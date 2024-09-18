'use client';

import Link from 'next/link';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod
}: PasswordSignInProps) {
  const t = useTranslations('PasswordSignIn');
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signInWithPassword, router);
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
            <label htmlFor="password">{t('password')}</label>
            <Input
              id="password"
              placeholder={t('passwordPlaceholder')}
              type="password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="mt-1">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('pleaseWait')}
              </>
            ) : (
              t('signIn')
            )}
          </Button>
        </div>
      </form>
      <p>
        <Link href="/signin/forgot_password" className="font-light text-sm">
          {t('forgotPassword')}
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="font-light text-sm">
            {t('magicLink')}
          </Link>
        </p>
      )}
      <p>
        <Link href="/signin/signup" className="font-light text-sm">
          {t('noAccount')}
        </Link>
      </p>
    </div>
  );
}
