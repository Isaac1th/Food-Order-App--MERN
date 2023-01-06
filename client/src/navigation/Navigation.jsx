import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';

import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import { Menu } from '../pages/Menu/Menu';
import PaymentSuccess from '../pages/PaymentSuccess/PaymentSuccess';
import Register from '../pages/Register/Register';
import { useSelector } from 'react-redux';
import { cartProducts } from '../stores/cart/cartSlice';
import { Footer } from '../components/Footer';

const Navigation = () => {
  const productsInCart = useSelector(cartProducts);

  return (
    <BrowserRouter>
      <Header cartCount={productsInCart ? productsInCart.length : 0} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Navigation;
