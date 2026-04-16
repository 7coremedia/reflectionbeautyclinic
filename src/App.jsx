import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Storefront
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

// Management
import ManagementLayout from './pages/management/ManagementLayout';
import ManageOrders from './pages/management/ManageOrders';
import ManageProducts from './pages/management/ManageProducts';
import ProductForm from './pages/management/ProductForm';
import ManageBlog from './pages/management/ManageBlog';
import BlogForm from './pages/management/BlogForm';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function StorefrontLayout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            {/* Storefront Routes */}
            <Route element={<StorefrontLayout />}>
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
            </Route>

            {/* Management Portal Routes - Protected */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'manager', 'moderator', 'writer']} />}>
              <Route path="/management" element={<ManagementLayout />}>
                <Route index element={<ManageOrders />} />
                <Route path="products" element={<ManageProducts />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:id" element={<ProductForm />} />
                <Route path="blog" element={<ManageBlog />} />
                <Route path="blog/new" element={<BlogForm />} />
                <Route path="blog/:id" element={<BlogForm />} />
              </Route>
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

