import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import WishList from "../pages/wishlist/WishList";
import ProductDetails from "../pages/product details/ProductDetails";
import Checkout from "../pages/checkout/Checkout";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import ForgotPassword from "../pages/forgot password/ForgotPassword";
import UpdateEmail from "../pages/update_email/UpdateEmail";
import ProtectedRoute from "../components/protected route/ProtectedRoute";
import Error404 from "../pages/error404/Error404";
import Dashboard from "../components/dashboard/Dashboard";

export default function AllRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/reset-email"
        element={
          <ProtectedRoute>
            <UpdateEmail />
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
