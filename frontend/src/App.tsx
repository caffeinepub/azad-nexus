import { createRootRoute, createRoute, createRouter, RouterProvider, Outlet, Link } from '@tanstack/react-router';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import QualityAssurance from './pages/QualityAssurance';
import GlobalFootprint from './pages/GlobalFootprint';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-5xl font-bold text-royal mb-4">404</h1>
      <p className="text-muted-foreground mb-8 font-body">Page not found.</p>
      <Link to="/" className="text-gold font-semibold hover:underline">Return Home</Link>
    </div>
  )
});

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const productsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/products', component: Products });
const qualityRoute = createRoute({ getParentRoute: () => rootRoute, path: '/quality', component: QualityAssurance });
const globalRoute = createRoute({ getParentRoute: () => rootRoute, path: '/global-footprint', component: GlobalFootprint });
const contactRoute = createRoute({ getParentRoute: () => rootRoute, path: '/contact', component: Contact });
const adminRoute = createRoute({ getParentRoute: () => rootRoute, path: '/admin', component: Admin });

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  qualityRoute,
  globalRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
