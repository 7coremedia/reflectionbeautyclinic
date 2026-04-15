import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Clinic from './pages/Clinic';
import Journal from './pages/Journal';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Account from './pages/Account';
import Rituals from './pages/Rituals';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/clinic" element={<Clinic />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/rituals" element={<Rituals />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}
