import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { CartProvider } from '@/hooks/useCart';
import { useLenis, scrollToHash } from '@/hooks/useLenis';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFAB } from '@/components/layout/WhatsAppFAB';
import { MeshBackground } from '@/components/primitives/MeshBackground';
import { CursorGlow } from '@/components/primitives/CursorGlow';
import { PageTransition } from '@/components/primitives/PageTransition';
import { CartDrawer } from '@/components/shop/CartDrawer';

const Landing = lazy(() => import('@/pages/Landing'));
const Shop = lazy(() => import('@/pages/Shop'));

function AppShell() {
  useLenis();
  const location = useLocation();
  const isShop = location.pathname.startsWith('/shop');

  useEffect(() => {
    if (!location.hash) return;
    const t = window.setTimeout(() => scrollToHash(location.hash), 250);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <>
      <MeshBackground />
      <CursorGlow />
      <Navbar />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-nour-accent border-t-transparent animate-spin" />
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Landing />
                </PageTransition>
              }
            />
            <Route
              path="/shop"
              element={
                <PageTransition>
                  <Shop />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                    <h1 className="font-heading font-black text-6xl text-gradient-orange">404</h1>
                    <p className="text-white mt-4">الصفحة غير موجودة</p>
                    <a
                      href="/"
                      className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-nour-accent text-white font-bold"
                    >
                      العودة للرئيسية
                    </a>
                  </div>
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>

      {!isShop && <Footer />}
      <WhatsAppFAB />
      <CartDrawer />
      <Toaster
        position="top-center"
        dir="rtl"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid #2A2A2A',
            fontFamily: 'Cairo, sans-serif',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}
