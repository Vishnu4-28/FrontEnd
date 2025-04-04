import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductView from './ProductView';

test('renders the Product data and given function for delete and edit ' , async () => {

    render(<ProductView/>)
    const productData = screen.getByTestId('Product-Data');
    expect(productData).toHaveTextContent([{
            "id": 1743415392070,
            "name": "t shirt",
            "price": "2500",
             "img": "dfodfjsdfjsdfrrfc"
    }]); 

});