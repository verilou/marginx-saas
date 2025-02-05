import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/types_db';
import { SupabaseClient } from '@supabase/supabase-js';
import { SubscriptionWithProduct } from '@/types/types_props';

// Define a function to create a Supabase client for server-side operations
// The function takes a cookie store created with next/headers cookies as an argument
export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    // Pass Supabase URL and anonymous key from the environment to the client
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    // Define a cookies object with methods for interacting with the cookie store and pass it to the client
    {
      cookies: {
        // The get method is used to retrieve a cookie by its name
        getAll() {
          return cookieStore.getAll();
        },
        // The set method is used to set a cookie with a given name, value, and options
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value }) =>
              cookieStore.set(name, value)
            );
          } catch (error) {
            console.log('supabase error wtf', error);

            // If the set method is called from a Server Component, an error may occur
            // This can be ignored if there is middleware refreshing user sessions
          }
        }
      }
    }
  );
};

export const getUser = async (supabase: SupabaseClient) => {
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
};

export const getSubscription = async (
  supabase: SupabaseClient
): Promise<SubscriptionWithProduct> => {
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.error('Error fetching subscription:', error.message);
  }

  return subscription;
};
