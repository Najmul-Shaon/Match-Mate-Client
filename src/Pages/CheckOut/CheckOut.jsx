import { loadStripe } from "@stripe/stripe-js";
import Cover from "../../Shared/Cover/Cover";
import paymentImg from "../../assets/payment.jpg";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PK_STRIPE);
const CheckOut = () => {


    
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Cover
        coverImg={paymentImg}
        coverTitle={"Pay to Unite, Pay for Love"}
      ></Cover>
      <div>
        <h3 className="text-center mt-12 text-xl font-semibold">Pay Now</h3>
        {/* payment area  */}
        <div>
          <Elements stripe={stripePromise}>
            <CheckOutForm></CheckOutForm>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
