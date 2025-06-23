import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Shop from './Pages/Shop';
import Product from './Pages/Product';
import LoginSignup from "./Pages/LoginSignup/LoginSignup";
import Cart from './Pages/Cart';
import ShopCategory from './Pages/ShopCategory';

import Hero from './Components/Hero/Hero';
import Popular from './Components/Popular/Popular';
import Offers from './Components/Offers/Offers';
import NewCollections from './Components/NewCollections/NewCollections';
import Newsletter from './Components/Newsletter/Newsletter';
import Footer from './Components/Footer/Footer';

import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
import Upload from './Components/Upload';

function App() {
  return (
    <BrowserRouter basename="/my-website">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Popular />
              <Offers />
              <NewCollections />
              <Newsletter />
            </>
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mens" element={<ShopCategory Banner={men_banner} category="men" />} />
        <Route path="/womens" element={<ShopCategory Banner={women_banner} category="women" />} />
        <Route path="/kids" element={<ShopCategory Banner={kids_banner} category="kid" />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
