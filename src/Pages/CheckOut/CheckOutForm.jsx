import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ bId, uEmail }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [trsxId, setTrsxId] = useState("");
  const navigate = useNavigate();

  const price = 5;

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: price }).then((res) => {
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
      setError(error.message);
    } else {
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
    } else {
      if (paymentIntent.status === "succeeded") {
        const requestInfo = {
          biodataId: bId,
          userEmail: uEmail,
          requestStatus: "pending",
        };
        const paymentInfo = {
          biodataId: bId,
          userEmail: uEmail,
          amount: paymentIntent.amount,
          trxId: paymentIntent.id,
          paymentVia: paymentIntent.payment_method_types[0],
          status: paymentIntent.status,
          paymentTime: new Date(),
        };
        axiosSecure
          .post("/makePayment", paymentInfo)
          .then((res) => {
            if (res.data.message === "Alredy Paid") {
              return Swal.fire({
                position: "center",
                icon: "error",
                title: "Already Paid",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            if (res.data.insertedId) {
              axiosSecure
                .post("/contactRequest", requestInfo)
                .then((res) => {
                  if (
                    res.data.message ===
                    "You have already paid for this biodada"
                  ) {
                    return Swal.fire({
                      position: "center",
                      icon: "error",
                      title: "You have already paid for this biodada",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                  if (res.data.insertedId) {
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Payment Complete!!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    navigate("/dashboard/myRequested");
                  }
                })
                .catch((err) => {
                  Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Payment Failed!!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                });
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Payment Failed!!",
              showConfirmButton: false,
              timer: 1500,
            });
          });

        setTrsxId(paymentIntent.id);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4 border border-gray-200"
    >
      {/* Card Input */}
      <div className="space-y-2">
        <label
          htmlFor="card-element"
          className="block text-sm font-medium text-gray-700"
        >
          Card Details
        </label>
        <div
          className="bg-gray-50 border border-gray-300 rounded-lg p-4 
                 focus-within:ring-2 focus-within:ring-green-500 
                 focus-within:border-green-500 transition-all"
        >
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  fontFamily: '"Inter", sans-serif',
                  "::placeholder": {
                    color: "#aab7c4",
                    fontStyle: "italic",
                  },
                },
                invalid: {
                  color: "#9e2146",
                  iconColor: "#9e2146",
                },
              },
            }}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      {/* Pay Button */}
      <button
        className={`w-full px-5 py-3 text-sm font-medium text-white bg-accent rounded-lg 
                hover:bg-accent-dark focus:ring-4 focus:outline-none 
                focus:ring-green-300 transition disabled:opacity-50`}
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckOutForm;
