import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { AIChatProvider } from "@/context/AIChatContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AIChatWidget } from "@/components/ai/AIChatWidget";
import { ToastContainer } from "@/components/ui/ToastContainer";
import HomePage from "@/pages/HomePage";
import ProductPage from "@/pages/ProductPage";
import CategoryPage from "@/pages/CategoryPage";
import SearchResultsPage from "@/pages/SearchResultsPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";
import { AccountPage, OrdersPage } from "@/pages/AccountPages";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AIChatProvider>
          <ScrollToTop />
          <Header />
          <main className="min-h-[60vh] pb-16 lg:pb-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produto/:id" element={<ProductPage />} />
              <Route path="/categoria/:category" element={<CategoryPage />} />
              <Route path="/busca" element={<SearchResultsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/pedido-confirmado" element={<OrderConfirmationPage />} />
              <Route path="/conta" element={<AccountPage />} />
              <Route path="/pedidos" element={<OrdersPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <MobileTabBar />
          <CartDrawer />
          <AIChatWidget />
          <ToastContainer />
        </AIChatProvider>
      </CartProvider>
    </ToastProvider>
  );
}
