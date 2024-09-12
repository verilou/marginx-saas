import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { getSubscription, getUser } from './server';

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  return { supabase, response };
};

export const updateSession = async (request: NextRequest) => {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    await supabase.auth.getUser();

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    console.log(e);
    return NextResponse.next({
      request: {
        headers: request.headers
      }
    });
  }
};

export const checkAuth = async (request: NextRequest) => {
  console.log('Checking auth');
  const { supabase } = createClient(request);
  try {
    const user = await getUser(supabase);
    console.log('User:', user);
    if (!user) {
      console.log('No user found');
      return NextResponse.redirect(
        new URL('/signin/password_signin', request.url),
        {
          status: 301
        }
      );
    }
  } catch (userError) {
    console.log('Error fetching user:', userError);
    return NextResponse.redirect(
      new URL('/signin/password_signin', request.url),
      {
        status: 301
      }
    );
  }
};

export const checkSubscription = async (request: NextRequest) => {
  const { supabase } = createClient(request);

  const subscription = await getSubscription(supabase);

  if (
    !subscription ||
    !subscription?.status ||
    !['trialing', 'active'].includes(subscription?.status)
  ) {
    return NextResponse.redirect(new URL('/', request.url), {
      status: 301
    });
  }
};
