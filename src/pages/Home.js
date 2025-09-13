import React from 'react'
import Packages from '../components/Packages'
import { useLocation, useSearchParams } from 'react-router-dom';
import { setCookie } from '../utils/cartUtils';

export default function Home() {

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("txn-id");

  if (orderId) {
    document.cookie = "basket_ident=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "basketVerified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const basketVerified = queryParams.get('basketVerified');

  if (basketVerified) {
    setCookie('basketVerified', true);
  }

  return (
    <>
      <h2 className='text-center my-5'>Featured For You!</h2>
      <Packages exceptPackage={false} />
    </>
  )
}
