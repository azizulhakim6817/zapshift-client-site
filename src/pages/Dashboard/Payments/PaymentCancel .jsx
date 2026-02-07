import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingPay from "./LoadingPay";

const PaymentCancel = () => {
  const { parcelId } = useParams();
  //console.log(parcelId);
  const axiosSecure = useAxiosSecure();

  //! get signle data -------------------------
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-parcel/${parcelId}`);
      //console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    <LoadingPay></LoadingPay>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
        <svg
          className="w-20 h-20 mx-auto text-red-500 mb-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was not completed. If this was a mistake, you can try
          again.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to={`/dashboard/my-parcels`}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition"
          >
            Try Again
          </Link>

          <button
            onClick={() => window.location.replace("/dashboard/my-parcels")}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 px-5 rounded-lg transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
