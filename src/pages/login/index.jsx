import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimateContainer } from 'react-animate-container';
/* eslint-disable react/jsx-pascal-case */

function Login() {
  const count = useSelector(state => state.counter.count);
  const sayi = useSelector(state => state.counter.sayi);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();


  return (
    <div >
    <div style={theme} className='grid grid-cols-1 h-screen'>
      {Array(8).fill().map((_, index) => (
        <AnimateContainer.fadeIn key={index}>
          <h2>react-animate-container</h2>
          <h2>react-animate-container</h2>
          <h2>react-animate-container</h2>
          <h2>react-animate-container</h2>
          <h2>react-animate-container</h2>
        </AnimateContainer.fadeIn>
      ))}
      <br />
      <div >
        <AnimateContainer.fadeIn
          duration={5}
          active
          iterationCount={1} // animasyonun tekrar sayısı
        >
          <h2>react-animate-container</h2>
          <h2>react-animate-container</h2>
          <h2>react-animate-container</h2>
          <h2>react-animate-container</h2>
          <h2>react-animate-container</h2>
        </AnimateContainer.fadeIn>
      </div>
    </div>
  </div>
  );
}

export default Login;
