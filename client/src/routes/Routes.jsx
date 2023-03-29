import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import Category from '../pages/Category/Category';
import Login from '../pages/Login/Login';
import AddProduct from '../pages/AddProduct/AddProduct';
import NotFound from '../pages/NotFound/NotFound';
import Blog from '../pages/Blog/Blog';
import MyProducts from '../pages/MyProducts/MyProducts';
import AllBuyers from '../pages/AllBuyers/AllBuyers';
import AllSellers from '../pages/AllSellers/AllSellers';
import Wishlist from '../pages/Wishlist/Wishlist';
import ProtectedRoute from './ProtectedRoute';
import SellerRoute from './SellerRoute';
import BuyerRoute from './BuyerRoute';
import AdminRoute from './AdminRoute';
import MyOrders from '../pages/MyOrders/MyOrders';
import FailedToLoad from '../components/FailedToLoad/FailedToLoad';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <FailedToLoad />,
      },
      {
        path: '/blog',
        element: <Blog />,
        errorElement: <FailedToLoad />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/category/:type',
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
        errorElement: <FailedToLoad />,
      },
      {
        path: '/my-orders',
        element: (
          <ProtectedRoute>
            <BuyerRoute>
              <MyOrders />
            </BuyerRoute>
          </ProtectedRoute>
        ),
        errorElement: <FailedToLoad />,
      },
      {
        path: '/wishlist',
        element: (
          <ProtectedRoute>
            <BuyerRoute>
              <Wishlist />
            </BuyerRoute>
          </ProtectedRoute>
        ),
        errorElement: <FailedToLoad />,
      },
      {
        path: '/add-product',
        element: (
          <ProtectedRoute>
            <SellerRoute>
              <AddProduct />
            </SellerRoute>
          </ProtectedRoute>
        ),
        errorElement: <FailedToLoad />,
      },
      {
        path: '/my-products',
        element: (
          <ProtectedRoute>
            <SellerRoute>
              <MyProducts />
            </SellerRoute>
          </ProtectedRoute>
        ),
        errorElement: <FailedToLoad />,
      },
      {
        path: '/all-buyers',
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <AllBuyers />
            </AdminRoute>
          </ProtectedRoute>
        ),
        errorElement: <FailedToLoad />,
      },
      {
        path: '/all-sellers',
        element: (
          <ProtectedRoute>
            <AdminRoute>
              <AllSellers />
            </AdminRoute>
          </ProtectedRoute>
        ),
        errorElement: <FailedToLoad />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
