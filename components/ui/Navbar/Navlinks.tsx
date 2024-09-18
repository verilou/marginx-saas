'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import Logo from '@/components/icons/Logo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';
import { ModeToggle } from '@/components/ui/ModeToggle';
import { User } from '@supabase/supabase-js';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NavlinksProps {
  user?: User | null;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <header>
      <nav className="sticky top-0 hidden md:flex h-16 justify-end gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4 mr-auto">
          <Link href="/" className={s.logo} aria-label="Logo">
            <Logo />
          </Link>
          <Link href="/">Pricing</Link>
          {user && (
            <>
              <Link href="/account">Account</Link>
              <Link href="/dashboard">Dashboard</Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
              <input type="hidden" name="pathName" value={usePathname()} />
              <button type="submit">Sign out</button>
            </form>
          ) : (
            <Link href="/signin">Sign In</Link>
          )}

          <ModeToggle />
        </div>
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden mt-4 ml-3">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col space-y-4 mt-4">
            <SheetHeader>
              <SheetTitle>MarginX</SheetTitle>
            </SheetHeader>
            <Link
              onClick={closeMenu}
              href="/"
              className={s.logo}
              aria-label="Logo"
            >
              <Logo />
            </Link>
            <Link onClick={closeMenu} href="/">
              Pricing
            </Link>
            {user ? (
              <>
                <Link onClick={closeMenu} href="/account">
                  Account
                </Link>
                <Link onClick={closeMenu} href="/dashboard">
                  Dashboard
                </Link>
                <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
                  <input type="hidden" name="pathName" value={usePathname()} />
                  <button onClick={closeMenu} type="submit">
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <Link onClick={closeMenu} href="/signin">
                Sign In
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
