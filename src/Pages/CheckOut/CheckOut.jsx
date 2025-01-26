import { loadStripe } from "@stripe/stripe-js";
import Cover from "../../Shared/Cover/Cover";
import paymentImg from "../../assets/payment.jpg";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_PK_STRIPE);
const CheckOut = () => {
  const { biodataId } = useParams();
  const { user } = useAuth();

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Cover
        coverImg={paymentImg}
        coverTitle={"Pay to Unite, Pay for Love"}
      ></Cover>
      {/* order and details container  */}
      <div className="flex flex-col md:flex-row justify-around mt-12 gap-6 px-4">
        {/* order details area  */}
        <div className="w-full md:w-1/2">
          <h3 className="text-center text-xl font-semibold">Order Details</h3>
          {/* table start  */}

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Order for
                  </th>
                  <td className="px-6 py-4">Contact Details</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Order by
                  </th>
                  <td className="px-6 py-4">{user?.email}</td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Biodata Id
                  </th>
                  <td className="px-6 py-4">{biodataId}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Need to Pay
                  </th>
                  <td className="px-6 py-4">$5</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* table end  */}
        </div>
        {/* payment area  */}
        <div className="w-full md:w-1/2">
          <h3 className="text-center text-xl font-semibold">Pay Now</h3>
          <div className="mt-6"></div>
          {/* payment area  */}
          <div className="mt-6">
            <Elements stripe={stripePromise}>
              <CheckOutForm
                bId={biodataId}
                uEmail={user?.email}
              ></CheckOutForm>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
