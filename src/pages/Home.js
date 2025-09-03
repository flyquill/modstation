import React from 'react'
import Packages from '../components/Packages'
import { useLocation } from 'react-router-dom';
import { setCookie } from '../utils/cartUtils';

export default function Home() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const basketVerified = queryParams.get('basketVerified');

  if(basketVerified){
    setCookie('basketVerified', true);
  }

  return (
    <>
        <h2 className='text-center my-5'>Featured For You!</h2>
        <Packages exceptPackage={false}/>
    </>
  )
}
