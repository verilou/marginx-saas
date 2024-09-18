'use client';

import { updatePassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod
}: UpdatePasswordProps) {
  const t = useTranslations('UpdatePassword');
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    await handleRequest(e, updatePassword, router);
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
            <label htmlFor="password">{t('newPassword')}</label>
            <Input
              id="password"
              placeholder={t('passwordPlaceholder')}
              type="password"
              name="password"
              autoComplete="current-password"
            />
            <label htmlFor="passwordConfirm">{t('confirmPassword')}</label>
            <Input
              id="passwordConfirm"
              placeholder={t('passwordPlaceholder')}
              type="password"
              name="passwordConfirm"
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
              t('updatePassword')
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
