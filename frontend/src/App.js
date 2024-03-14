import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Contact } from './pages/Contact';
import { ProductDetails } from './pages/ProductDetails';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Checkout } from './pages/Checkout';
import { Policy } from './pages/Policy';
import { Pagenotfound } from './pages/Pagenotfound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CreateCategory } from './pages/admin/CreateCategory';
import { CreateProduct } from './pages/admin/CreateProduct';
import { Products } from './pages/admin/Products';
import { UpdateProduct } from './pages/admin/UpdateProduct';
import { AdminRoute } from './components/routes/AdminRoute'
import { CartPage } from './pages/CartPage';
import { Home } from './pages/Home';
import { SearchComponent } from './pages/SearchComponent';
import { Users } from './pages/admin/Users';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { useEffect, useState } from 'react';

function App() {

  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('auth')
    const data = JSON.parse(user)
    setAuthUser(data?.user)
  }, [])

  return (
    <div>
      
      {authUser ? <Navbar /> : <></>}

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <Routes>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Pagenotfound />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/policy" element={<Policy />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/create-category" element={<CreateCategory />} />
          <Route path="/dashboard/admin/create-product" element={<CreateProduct />} />
          <Route path="/dashboard/admin/product/:slug" element={<UpdateProduct />} />
          <Route path="/dashboard/admin/products" element={<Products />} />
          <Route path="/dashboard/admin/users" element={<Users />} />
        </Route>

      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App;
