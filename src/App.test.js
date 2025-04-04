import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import ProductView from './Component/ProductView/ProductView'; 
import Product from './Component/ProductForm';
import { MemoryRouter } from 'react-router-dom';

jest.mock('/Component/ProductView/ProductView');
jest.mock('./Component/ProductForm');

describe('test React Routes with Jest', () => {
  test('should mock the Home component', () => {
    ProductView.mockImplementation();
    Product.mockImplementation();     

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const text = screen.getByText('Hello From Home Page');
    expect(text).toBeInTheDocument();
  });
});
