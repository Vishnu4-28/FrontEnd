import React from 'react';
import Product from '../../Component/ProductForm';
import ProductView from '../../Component/ProductView/ProductView';

function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Product />
      <ProductView />
    </div>
  );
}

export default Main;
