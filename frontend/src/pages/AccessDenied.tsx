import { Link } from '@tanstack/react-router';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-cream-50">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert size={36} className="text-destructive" />
        </div>
        <h1 className="font-display text-4xl font-bold text-green-800 mb-4">Access Denied</h1>
        <p className="text-muted-foreground font-body text-lg mb-8 leading-relaxed">
          You must be logged in as an administrator to access this page. 
          Please sign in with your admin credentials.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-md transition-colors font-body"
          >
            <Lock size={16} />
            Admin Login
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-semibold rounded-md transition-all duration-200 font-body"
          >
            <ArrowLeft size={16} />
            Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
