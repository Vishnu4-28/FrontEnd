import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Product from "./Component/ProductForm";
import { store } from "./Redux/Store"; 
import ProductView from "./Component/ProductView/ProductView";
import Main from "./page/Main/Main";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import Pct from "./Component/Pct/Pct";

const App = () => {
  return (
    <Provider store={store}> 
      <BrowserRouter>
        <Header/>
        <Routes>
        <Route path="/pct" element={<Pct/>}/>
          <Route path="/main" element={<Main/>}/>
          <Route path="/Product/:id" element={<Product />} />
          <Route path="/Product" element={<Product/>}/>
          <Route path="/" element={<ProductView />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
