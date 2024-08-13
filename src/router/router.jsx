import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main/Main";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import Home from "../Pages/Home/Home/Home";
import Dashboard from "../Layout/Dashboard/Dashboard";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import ForgetPassword from "../Pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import ManageProduct from "../Pages/Dashboard/ManageProduct/ManageProduct";
import WishList from "../Pages/WishList/WishList";
import ShoppingCart from "../Pages/ShoppingCart/ShoppingCart";
import MyPayments from "../Pages/MyPayments/MyPayments";
import Search from "../Pages/Search/Search";
import AdminRoute from "./AdminRoute";
import Details from "../Pages/Deatils/Details";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Conatct/Conatct";
import RecipeReviewCard from "../Pages/Shop/Shop";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            },
            {
                path: 'request-password',
                element: <ForgetPassword></ForgetPassword>
            },
            {
                path: 'shop',
                element: <RecipeReviewCard></RecipeReviewCard>
            },
            {
                path: 'wishList',
                element: <WishList></WishList>
            },
            {
                path: 'shoppingCart',
                element: <ShoppingCart></ShoppingCart>
            },
            {
                path: 'checkOut',
                element: <MyPayments></MyPayments>
            },
            {
                path: 'search',
                element: <Search></Search>
            },
            {
                path: 'details/:id',
                element: <Details></Details>,
                loader: ({ params }) => fetch(`http://localhost:5000/api/collection/${params.id}`)
            },
            {
                path: 'blog',
                element: <Blog></Blog>
            },
            {
                path: 'contact',
                element: <Contact></Contact>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: 'addProduct',
                element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
            },
            {
                path: 'manageProduct',
                element: <AdminRoute><ManageProduct></ManageProduct></AdminRoute>
            }

        ]
    }
]);

export default router
