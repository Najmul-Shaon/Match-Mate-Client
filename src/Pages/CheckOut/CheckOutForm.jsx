import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const CheckOutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [trsxId, setTrsxId] = useState("");

  const price = 5;

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("Payment mathod", paymentMethod);
      setError("");
    }
    //   confirm payment
    const { paymentIntent, error: cardConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "unknown",
          },
        },
      });
    if (cardConfirmError) {
      console.log("confimr error ", cardConfirmError);
    } else {
      console.log("Payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("trx", paymentIntent.id);
        setTrsxId(paymentIntent.id);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="px-3 py-2 my-4 text-xs font-medium text-center text-white bg-accent rounded-lg hover:bg-accent focus:ring-4 focus:outline-none focus:ring-blue-300"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {/* <button
        type="button"
        className="px-3 py-2 my-4 text-xs font-medium text-center text-white bg-accent rounded-lg hover:bg-accent focus:ring-4 focus:outline-none focus:ring-blue-300"
        disabled={!stripe}
      >
        Pay
      </button> */}
    </form>
  );
};

export default CheckOutForm;
