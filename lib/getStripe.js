import { loadStripe } from "@stripe/stripe-js";

let stripePromise;


// if stripePromise doesn't exist then we want to set stripePromise = loadStripe(); 
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }

    return stripePromise;
}


export default getStripe;