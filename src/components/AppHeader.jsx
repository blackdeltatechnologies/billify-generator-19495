import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FileText, Users, History, LogOut, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { to: '/app', label: 'Bills', icon: FileText },
  { to: '/receipt', label: 'Receipts', icon: FileText },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/documents', label: 'Documents', icon: History },
];

export const AppHeader = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  const NavItems = ({ mobile = false }) => (
    <>
      {navLinks.map(({ to, label, icon: Icon }) => {
        const active = location.pathname === to;
        const className = mobile
          ? `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              active
                ? 'bg-primary/10 text-primary'
                : 'text-foreground hover:bg-accent/10'
            }`
          : `text-sm font-medium transition-colors hover:text-primary ${
              active ? 'text-primary' : 'text-muted-foreground'
            }`;
        return (
          <Link key={to} to={to} className={className}>
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-40 w-full glass-effect border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/app" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg gradient-text">Billify</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavItems />
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-muted-foreground">
            {user.email}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="hidden md:flex"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Button>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-2 mt-8">
                <NavItems mobile />
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent/10 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
