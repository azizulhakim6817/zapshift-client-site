import { useQuery } from "@tanstack/react-query";
import useAuth from "./../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //! tanstack query get all data-------------------
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
  //console.log("data", parcels);

  //! handlePayment-------------------------------
  const handlePayment = async (parcel) => {
    const parcelInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      senderEmail: parcel.senderEmail,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post(`/create-checkout-session`, parcelInfo);
    //console.log("url: ", res.data);
    if (res.data.url) {
      return window.location.assign(res.data.url);
    }
  };

  //! handleDelete ------------------------------
  const handleDelete = (id) => {
    //console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcel-delete/${id}`).then((res) => {
          refetch();
          //console.log(res.data);
          if (res.data.deletedCoun) {
            Swal.fire({
              title: "Parcel Deleted!",
              text: "Your Parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className=" p-4 overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <div>
          <h1
            className="mt-2 text-secondary
           text-center font-bold text-xl"
          >
            ALL OF MY PARCELS :{" "}
            <span className="text-primary">( {parcels?.length} )</span>
          </h1>
        </div>
        <table className="table">
          {/* head---------------------------*/}
          <thead>
            <tr>
              <th>SL NO :</th>
              <th>Sender Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Trackin Id</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* map--------------------------------------------------*/}
            {parcels?.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td className="md:text-xl">{parcel?.parcelName}</td>
                <td>${parcel?.cost}</td>
                {/* payment_status-------------pay-------------------*/}
                <td>
                  {parcel?.paymentStatus === "paid" ? (
                    <sapn className="px-3 py-1 rounded-md font-bold bg-gray-300 text-green-500">
                      Paid
                    </sapn>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="px-4 py-1 rounded-md text-secondary font-bold bg-primary hover:text-white hover:bg-secondary"
                    >
                      Pay
                    </button>
                    // <Link
                    //   to={`/dashboard/payment/${parcel._id}`}
                    //   className="px-4 py-1 rounded-md text-secondary font-bold bg-primary hover:text-white hover:bg-secondary"
                    // >
                    //   Pay
                    // </Link>
                  )}
                </td>
                {/* tacking id------------------------------------------*/}
                <td>
                  <Link
                    to={`/parcel-tracking/${parcel?.trackingId}`}
                    className="px-4 py-1 rounded-md bg-primary text-secondary "
                  >
                    {parcel?.trackingId}
                  </Link>
                </td>
                {/* delivery status (pending || pending-pickup----------*/}
                <td>
                  {parcel?.deliveryStatus === "pending" ||
                  parcel?.deliveryStatus === "pending-pickup" ? (
                    <button className="px-4 py-1 rounded-md bg-primary text-secondary">
                      {parcel?.deliveryStatus}
                    </button>
                  ) : (
                    <button className="px-4 py-1 rounded-md bg-gray-400 text-secondary">
                      {parcel?.deliveryStatus}
                    </button>
                  )}
                </td>
                {/* view parcel-----------------------------------------*/}
                <td className="flex gap-1">
                  <button className="btn btn-square hover:bg-primary">
                    <FaEye />
                  </button>
                  {/* edit parcel--------------------------------------*/}
                  <button className="btn btn-square hover:bg-primary">
                    <FiEdit />
                  </button>
                  {/* delete parcel-------------------------------------*/}
                  <button
                    onClick={() => handleDelete(parcel?._id)}
                    className="btn btn-square hover:bg-primary text-rose-500"
                  >
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcel;
