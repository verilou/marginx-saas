import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import {
  getAuthTypes,
  getViewTypes,
  getDefaultSignInView,
  getRedirectMethod
} from '@/utils/auth-helpers/settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PasswordSignIn from '@/components/ui/AuthForms/PasswordSignIn';
import EmailSignIn from '@/components/ui/AuthForms/EmailSignIn';
import { Separator } from '@/components/ui/separator';
import OauthSignIn from '@/components/ui/AuthForms/OauthSignIn';
import ForgotPassword from '@/components/ui/AuthForms/ForgotPassword';
import UpdatePassword from '@/components/ui/AuthForms/UpdatePassword';
import SignUp from '@/components/ui/AuthForms/Signup';

export default async function SignIn({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { disable_button: boolean };
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes();
  const viewTypes = getViewTypes();
  const redirectMethod = getRedirectMethod();

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string;

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id;
  } else {
    const preferredSignInView =
      cookies().get('preferredSignInView')?.value || null;
    viewProp = getDefaultSignInView(preferredSignInView);
    return redirect(`/signin/${viewProp}`);
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user && viewProp !== 'update_password') {
    return redirect('/');
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin');
  }

  const t = await getTranslations('signIn');

  const title = (() => {
    switch (viewProp) {
      case 'forgot_password':
        return t('reset_password');
      case 'update_password':
        return t('update_password');
      case 'signup':
        return t('signup');
      default:
        return t('signin');
    }
  })();

  return (
    <Card className="w-full m-auto max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {viewProp === 'password_signin' && (
          <PasswordSignIn
            allowEmail={allowEmail}
            redirectMethod={redirectMethod}
          />
        )}
        {viewProp === 'email_signin' && (
          <EmailSignIn
            allowPassword={allowPassword}
            redirectMethod={redirectMethod}
            disableButton={searchParams.disable_button}
          />
        )}
        {viewProp === 'forgot_password' && (
          <ForgotPassword
            allowEmail={allowEmail}
            redirectMethod={redirectMethod}
            disableButton={searchParams.disable_button}
          />
        )}
        {viewProp === 'update_password' && (
          <UpdatePassword redirectMethod={redirectMethod} />
        )}
        {viewProp === 'signup' && (
          <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
        )}
        {viewProp !== 'update_password' && allowOauth && (
          <>
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-muted-foreground">{t('or')}</span>
              <Separator className="flex-1" />
            </div>
            <OauthSignIn />
          </>
        )}
      </CardContent>
    </Card>
  );
}
