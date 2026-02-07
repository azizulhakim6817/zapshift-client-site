import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import LoadingPay from "./LoadingPay";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const PaymentSuccess = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [paymentInfor, setPaymentInfo] = useState();

  //! params from session_id get url ----------------- */
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  //console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [axiosSecure, sessionId]);

  if (loading) {
    <LoadingPay></LoadingPay>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
        <svg
          className="w-20 h-20 mx-auto text-green-500 mb-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>

        <div className="my-2 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="font-bold">Trnsaction Id </th>
                <th className="font-bold">Tracking Id</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td> {paymentInfor?.transactionId}</td>
                <td> {paymentInfor?.trackingId}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          onClick={() => window.location.replace("/dashboard/my-parcels")}
          className="bg-primary  hover:bg-green-600 text-secondary font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
