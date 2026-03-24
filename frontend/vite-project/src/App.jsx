import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthoLayout from "./Components/pages/AuthoLayout";
import Loging from "./Components/pages/Loging";
import Register from "./Components/pages/Register";
import AdminLayout from "./Components/pages/Admin/Layout";
import AdminDaskboard from "./Components/pages/Admin/Daskboard";
import AdminFeature from "./Components/pages/Admin/Feature";
import AdminOrdered from "./Components/pages/Admin/Ordered";
import AdminProduct from "./Components/pages/shoping-view/Product";
import ShopingLayout from "./Components/pages/shoping-view/Layout";
import Nofound from "./Components/pages/no-found";
import ShopingHome from "./Components/pages/shoping-view/Home";
import ShopingListing from "./Components/pages/shoping-view/Listing";
import ShopingCheckout from "./Components/pages/shoping-view/CheckOut";
import ShopingAccount from "./Components/pages/shoping-view/Account";
import Check_auth from "./Components/common/Check-auth";
import Unouth from "./Components/pages/no-found/Unouth";
import { useDispatch, useSelector } from "react-redux";
// import CheckAutho from "./Components/pages/Admin/admin-views/CheckAutho";
import { useEffect } from "react";
import { check_Autho } from "./store/autho-slice";
import UpdateForm from "./Components/pages/Admin/admin-views/UpdateProduct";
import Review from "./Components/pages/shoping-view/Review";
import Cart from "./Components/pages/shoping-view/Cart";
import EditAddress from "./Components/pages/shoping-view/EditAddress";
import PaypalReturn from "./Components/pages/shoping-view/PaypalReturn";
import PaymentSuccess from "./Components/pages/shoping-view/PaymentSuccess";
import ViewOrderDetails from "./Components/pages/shoping-view/ViewOrderDetails";
import AdminViewOrderDetails from "./Components/pages/Admin/admin-views/AdminViewOrderDetails";

const App = () => {
  const { isAuthenticated, user, isLoding } = useSelector(
    (state) => state.auth
  );

  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(check_Autho());
  }, []);

  if (isLoding) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex  flex-col overflow-hidden bg-white">
        <Routes>
          {/* Default route */}

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/shop/home" replace />
              ) : (
                <Navigate to="/autho/login" replace />
              )
            }
          />

          {/* loging  */}
          <Route
            path="/autho"
            element={
              <Check_auth isAutheticate={isAuthenticated} user={user}>
                <AuthoLayout />
              </Check_auth>
            }
          >
            <Route path="login" element={<Loging />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* admin */}
          <Route
            path="/admin"
            element={
              <Check_auth isAutheticate={isAuthenticated} user={user}>
                <AdminLayout />
              </Check_auth>
            }
          >
            <Route path="deskboard" element={<AdminDaskboard />} />
            <Route path="feature" element={<AdminFeature />} />
            <Route path="ordered" element={<AdminOrdered />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path=":id/details" element={<AdminViewOrderDetails />} />
          </Route>
          {/* Shoping */}
          <Route
            path="/shop"
            element={
              <Check_auth isAutheticate={isAuthenticated} user={user}>
                <ShopingLayout />
              </Check_auth>
            }
          >
            {/* Home page route */}
            <Route path="home" element={<ShopingHome />} />
            <Route path="listing" element={<ShopingListing />} />
            <Route path="listing/:id/review" element={<Review />} />
            <Route
              path="account/listing/:addressId/:userId/address"
              element={<EditAddress />}
            />
            <Route path="listing/cart" element={<Cart />} />
            <Route path="checkout" element={<ShopingCheckout />} />
            <Route path="account" element={<ShopingAccount />} />
            <Route path="paypal-return" element={<PaypalReturn />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route
              path="account/order/:id/details"
              element={<ViewOrderDetails />}
            />
          </Route>
          <Route path="/admin/product/:id/update" element={<UpdateForm />} />
          {/* <Route path="/admin/product/:id/review" element={<Review />} /> */}

          <Route path="/unauth-page" element={<Unouth />} />
          <Route path="*" element={<Nofound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
