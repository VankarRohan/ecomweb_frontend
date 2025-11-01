// import Navbar from "./components/Navbar"

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Aos from "aos";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import ShopListing from "./pages/ShopListing";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Authentication from "./pages/Authentication";
import CheckOut from "./pages/CheckOut";
import ProductDetails from "./pages/ProductDetails";
import Favorite from "./pages/Favorite";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
// import { useSelector } from 'react-redux';


function App() {

  // const location = useLocation()
  const currentUser = JSON.parse(localStorage.getItem("user"));


  const [openAuth, setOpenAuth] = useState(false)
  // const hideNavbarRoutes = ['/signin', '/signup'];
  // const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    Aos.init({
      duration: 1000, // animation duration
      once: true,     // whether animation should happen only once
    });
  }, []);
  return (
    <>
      <header id="header" className="header">

        <Navbar currentUser={currentUser} setOpenAuth={setOpenAuth} openAuth={openAuth} />
      </header>

      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/cart" exact element={<Cart />}></Route>
        <Route path="/shoplisting" exact element={<ShopListing />}></Route>
        <Route path="/contact" exact element={<Contact />}></Route>
        <Route path="/account" element={<Account setOpenAuth={setOpenAuth} openAuth={openAuth} />}>
          <Route path="orders" element={<Orders/>} />
          <Route path="favorites" element={<Favorite />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/signin" exact element={<SignIn />}></Route>
        <Route path="/signup" exact element={<SignUp />}></Route>
        <Route path="/checkout" exact element={<CheckOut />}></Route>
        <Route path="/productdetails/:id" element={<ProductDetails />}></Route>
        {/* <Route path="/favorite" exact element={<Favorite />}></Route> */}

      </Routes>
      {openAuth &&
        <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />

      }
    </>
  );
}

export default App;
