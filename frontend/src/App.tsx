import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import InquiriesManagement from './pages/InquiriesManagement';
import BlogManagement from './pages/BlogManagement';
import BlogPostEditor from './pages/BlogPostEditor';
import ServicesManagement from './pages/ServicesManagement';
import ServiceEditor from './pages/ServiceEditor';
import AccessDenied from './pages/AccessDenied';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

// Public layout with Navigation + Footer
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// Admin layout without public nav/footer
function AdminLayout() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Outlet />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute();

// Layout routes
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: PublicLayout,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin-layout',
  component: AdminLayout,
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: About,
});

const servicesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/services',
  component: Services,
});

const blogRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/blog',
  component: Blog,
});

const blogPostRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/blog/$id',
  component: BlogPost,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/contact',
  component: Contact,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/access-denied',
  component: AccessDenied,
});

// Admin routes
const adminLoginRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: AdminLogin,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/dashboard',
  component: AdminDashboard,
});

const adminInquiriesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/inquiries',
  component: InquiriesManagement,
});

const adminBlogRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/blog',
  component: BlogManagement,
});

const adminBlogNewRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/blog/new',
  component: BlogPostEditor,
});

const adminBlogEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/blog/edit/$id',
  component: BlogPostEditor,
});

const adminServicesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/services',
  component: ServicesManagement,
});

const adminServiceEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/services/edit/$id',
  component: ServiceEditor,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    aboutRoute,
    servicesRoute,
    blogRoute,
    blogPostRoute,
    contactRoute,
    accessDeniedRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminLoginRoute,
    adminDashboardRoute,
    adminInquiriesRoute,
    adminBlogRoute,
    adminBlogNewRoute,
    adminBlogEditRoute,
    adminServicesRoute,
    adminServiceEditRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
