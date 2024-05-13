import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWishList } from "./redux/wishList.slice/wishList.slice";

import HeaderPage from "./pages/HeaderPage";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer/Footer";
// import Products from "./components/Products/Products";
import ProductPage from "./components/ProductPage/ProductPage";
import WishListPage from "./pages/WishListPage";
import Cart from "./pages/Cart/Cart";
import "./App.css";
import FilteredPage from "./pages/FilteredPage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.carts);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  useEffect(() => {
    dispatch(fetchWishList());
  }, [dispatch]);

  return (
    <>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:searchQuery" element={<FilteredPage />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/userPage/*" element={<UserPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
