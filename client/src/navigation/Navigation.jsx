import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';

import Cart from '../pages/Cart/Cart';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import { Menu } from '../pages/Menu/Menu';
import PaymentSuccess from '../pages/PaymentSuccess/PaymentSuccess';
import Register from '../pages/Register/Register';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
