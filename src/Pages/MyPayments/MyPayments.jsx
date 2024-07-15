import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import './Card.css'
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
const stripePromise = loadStripe(import.meta.env.VITE_Payments_PK);

const MyPayments = () => {
    const [carts] = useCart();
    const total = carts?.reduce((sum, item) => (item.price * (item.quantity)) + sum, 0);
    const productPrice = parseFloat(total.toFixed(2));
    const price = productPrice + 25
    const { user } = useAuth();

    const paymentInfo = {
        name: user?.displayName,
        email: user?.email,
        total,
        quantity: carts.length,
        itemName: carts.map(item => item.product_name),
        item: carts.map(item => item._id),
        date: new Date(),
    };
    

    return (
        <div className="bg-[#f6f9fc]">
            <div className="AppWrapper ">
                <Elements stripe={stripePromise}>
                    <CheckoutForm paymentInfo={paymentInfo} carts={carts} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default MyPayments;
