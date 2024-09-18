'use client';

import Link from 'next/link';
import { requestPasswordUpdate } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton
}: ForgotPasswordProps) {
  const t = useTranslations('ForgotPassword');
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, requestPasswordUpdate, router);
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
          <Button type="submit" className="mt-1" disabled={disableButton}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('pleaseWait')}
              </>
            ) : (
              t('sendEmail')
            )}
          </Button>
        </div>
      </form>
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
      <p>
        <Link href="/signin/signup" className="font-light text-sm">
          {t('noAccount')}
        </Link>
      </p>
    </div>
  );
}
