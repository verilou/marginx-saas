import { checkAuth, checkSubscription } from '@/utils/supabase/middleware';
import { NextRequest } from 'next/server';

export const dashboard = async (request: NextRequest) => {
  const auth = await checkAuth(request);
  if (auth) return auth;

  const subscription = await checkSubscription(request);
  if (subscription) return subscription;

  return;
};
