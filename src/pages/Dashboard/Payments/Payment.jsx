import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BsBoxArrowInDownRight } from "react-icons/bs";

const Payment = () => {
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
  //console.log("single ", parcel);

  //! handlePayment-----------------------
  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
    };
    const res = await axiosSecure.post(`/create-checkout-session`, paymentInfo);
    console.log("paymentInfo url : ", res.data);
    window.location.href = res.data.url;
  };

  return (
    <div className="mx-4 my-2">
      <h2
        className="my-3 text-secondary
            font-bold text-xl flex justify-center items-center gap-4"
      >
        Please Pay <span className="text-primary">${parcel?.cost}</span> for :{" "}
        {parcel?.parcelName}
        <BsBoxArrowInDownRight size={20} className="text-secondary" />
      </h2>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sender Name</th>
              <th>Cost</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{parcel?.parcelName}</td>
              <td>${parcel?.cost}</td>
              <td>
                <button
                  onClick={handlePayment}
                  className="px-4 py-1 rounded-md text-secondary font-bold bg-primary hover:text-white hover:bg-secondary"
                >
                  Pay
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
