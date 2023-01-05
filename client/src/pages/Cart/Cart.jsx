import React from 'react';
import Tabs from '../../components/Tabs';
import Button from '../../components/elements/Button';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../stores/menu/productSlice';
import useTabSwitch from '../../hooks/useTabSwitch';
import { ReactComponent as ArrowRightSvg } from '../../assets/icons/arrow-right-long-svgrepo-com.svg';
import AddressForm from '../../components/AddressForm';
import ProductSummary from '../../components/ProductSummary';
import { StripeWrapper } from '../../components/PaymentForm';

const Cart = () => {
  const cart = useSelector(selectAllProducts);
  const tabs = ['Summary', 'Delivery', 'Payment'];
  const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');
  console.log(cart);

  if (!cart || cart.products.length === 0) {
    return (
      <div className="bg-white h-full text-black flex justify-center p-4">
        <h1>Your Cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="bg-white h-screen text-black mx-auto mg-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8">
      <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
      <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}`}>
        <ProductSummary />
        <div className="flex justify-end p-2">
          <Button
            variant="dark"
            className="flex items-center"
            onClick={() => handleTabSwitch('Delivery')}
          >
            <span className="mr-1">Next</span>
            <ArrowRightSvg />
          </Button>
        </div>
      </div>
      <div className={`tabs ${currentTab !== 'Delivery' ? 'hidden' : ''}`}>
        <AddressForm onTabSwitch={handleTabSwitch} />
      </div>
      <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''}`}>
        <StripeWrapper />
      </div>
    </div>
  );
};

export default Cart;
