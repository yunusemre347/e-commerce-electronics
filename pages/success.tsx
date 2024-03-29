import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '@/context/StateContext';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } =
    useStateContext() || {};
    useEffect(()=>{
        localStorage.clear();
        setTotalQuantities?.(0);
        setTotalPrice?.(0);
        setCartItems?.([]);
    },[])
  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className='email-msg'>Check your email inbox for the receipt.</p>
        <p className='description'>
          if you have any questions please email:
          <a className='email' href='mailto:yunusemreyilmaz347@gmail.com'>
            yunusemreyilmaz347@gmail.com
          </a>
        </p>
        <Link href='/'>
          <button type='button' className='btn'>
            {' '}
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
