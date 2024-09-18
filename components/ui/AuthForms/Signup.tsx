'use client';

import React, { FormEvent } from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const t = useTranslations('SignUp');
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, signUp, router);
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
          <Button type="submit" className="mt-1">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('pleaseWait')}
              </>
            ) : (
              t('signUp')
            )}
          </Button>
        </div>
      </form>
      <p>{t('alreadyHaveAccount')}</p>
      <p>
        <Link href="/signin/password_signin" className="font-light text-sm">
          {t('signInWithPassword')}
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="font-light text-sm">
            {t('magicLink')}
          </Link>
        </p>
      )}
    </div>
  );
}
