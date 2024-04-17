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
import RecipeReviewCard from "../Pages/Dashboard/Shop/Shop";
import WishList from "../Pages/WishList/WishList";
import ShoppingCart from "../Pages/ShoppingCart/ShoppingCart";
import MyPayments from "../Pages/MyPayments/MyPayments";
import Search from "../Pages/Search/Search";


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
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'manageUsers',
                element: <ManageUser></ManageUser>
            },
            {
                path: 'addProduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: 'manageProduct',
                element: <ManageProduct></ManageProduct>
            }

        ]
    }
]);

export default router
