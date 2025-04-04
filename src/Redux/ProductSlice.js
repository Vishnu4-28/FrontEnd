import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const loadProductsFromStorage = () => {
  const data = localStorage.getItem('products');
  return data ? JSON.parse(data) : [];
};

const saveProductsToStorage = (products) => { 
  localStorage.setItem('products', JSON.stringify(products));
};

export const getProduct = createAsyncThunk(
'product/productData',
async() => {
    // const response = await axios.get('https://dummyjson.com/products')
    const response = await axios.get('http://localhost:5000/api/products/Allproducts')

    console.log("response",response); 
    return response.data.products

})

export const addProductData = createAsyncThunk(
  'addProduct/product',
  async (payload) => {
    console.log("FormData payload", payload);

    const response = await axios.post(
      'http://localhost:5000/api/products',
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log("Add product response", response);
    return response.data; 
  }
);


const initialState = {
  products: loadProductsFromStorage(),
  updateProduct : [],
  selectedProduct : null,
  ProductData : {},
  allProduct : [],
  status: 'idle',
  error: null,
  productId : null

};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const exists = state.products.some(
        (product) => product.name === action.payload.name
      );
      if (!exists) {
        state.products.push(action.payload);
        // state.ProductData.push(action.payload);
        saveProductsToStorage(state.products);
      } else {
        alert('Product already exists!');
      }
    },

    updateProduct: (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
    
        if (index !== -1) {
            state.products[index] = action.payload;
            saveProductsToStorage(state.products);
        }
    },
      
    selectedProduct : (state ,action) => {
        state.selectedProduct = action.payload;
    },
    getID : (state,action) =>{
      state.productId=action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveProductsToStorage(state.products);
    },
  },
  extraReducers: (builder) => {
    builder
    //loading
      .addCase(getProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductData.pending, (state) => {
        state.status = 'loading';
      })

      //success
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("success",action.payload)
        state.allProduct = action.payload;
      })
      .addCase(addProductData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("success",action.payload)
        state.allProduct = action.payload;
      })

      //failed
      .addCase(getProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProductData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const selectAllProduct = (state) => state.products.allProduct;
export const getProductStatus = (state) => state.products.status;
export const getProductError = (state) => state.products.error;
export const { addProduct, updateProduct, deleteProduct , selectedProduct ,getID } = productSlice.actions;
export default productSlice.reducer;
