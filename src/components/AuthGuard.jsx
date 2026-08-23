import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const publicRoutes = ['/', '/login', '/signup', '/share'];

export const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isPublicRoute = publicRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith('/share/')
  );

  if (!user && !isPublicRoute) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && (location.pathname === '/login' || location.pathname === '/signup')) {
    return <Navigate to="/app" replace />;
  }

  return children;
};
