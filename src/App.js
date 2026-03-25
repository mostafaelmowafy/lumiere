import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "./UI/WhatsAppButton";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <CartProvider>
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:name" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* هنا التعديل */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
