import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRef, useState } from "react";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const viewRef = useRef(null);
  const [riderView, setRiderView] = useState([]);
  console.log("rider View", riderView);

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending", "approved"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  //! update-rider-status-----------------
  const updateStatus = async (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider.email,
    };
    const res = await axiosSecure.patch(
      `/update-rider/${rider?._id}`,
      updateInfo,
    );
    refetch();
    //console.log("riders", res?.data);
    if (res?.data?.modifiedCount) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Rider status is set to  ${status} successfully`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  //! approved-handleRider-rider----------
  const handleApprovedRider = async (rider) => {
    updateStatus(rider, "approved");
  };
  //! rejected-handleRider-rider----------
  const handleRejectedRider = async (rider) => {
    updateStatus(rider, "rejected");
  };

  //! delete-rider -----------------------
  const handleRiderDelete = async (id) => {
    const res = await axiosSecure.delete(`/rider-delete/${id}`);
    refetch();
    console.log(res.data);
  };

  //! rider-view-handle-button------------
  const handleRiderView = (rider) => {
    viewRef.current.showModal();
    setRiderView(rider);
  };

  //! rider-view-handle-button-----------
  const handleRiderViewCloseButton = () => {
    viewRef.current.close();
  };

  return (
    <div>
      <h1 className="my-2 text-center text-xl md:text-2xl font-bold text-secondary">
        Rider Pending Approveal ({riders?.length}) 🚲
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>SL NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders?.map((rider, i) => (
              <tr key={rider._id}>
                <th>{i + 1}</th>
                <td>{rider?.name}</td>
                <td>{rider?.email}</td>
                <td>{rider?.district}</td>
                {/* application status----------- */}
                <td>
                  <p
                    className={` font-semibold  ${
                      rider?.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {rider?.status}
                  </p>
                </td>
                {/* work status---------------- */}
                <td>{rider?.workStatus}</td>

                <td className="space-x-1 flex md:flex-1">
                  {/* view rider----------- */}
                  <button
                    onClick={() => handleRiderView(rider)}
                    className="btn btn-square"
                  >
                    <FaEye size={18} />
                  </button>
                  {/* accept rider------------------- */}
                  <button
                    onClick={() => {
                      handleApprovedRider(rider);
                    }}
                    className="btn btn-square"
                  >
                    <FaUserCheck size={18} />
                  </button>
                  {/* rejected rider---------------- */}
                  <button
                    onClick={() => {
                      handleRejectedRider(rider);
                    }}
                    className="btn btn-square"
                  >
                    <IoPersonRemoveSharp size={18} />
                  </button>
                  {/* delete rider-------------*/}
                  <button
                    onClick={() => handleRiderDelete(rider?._id)}
                    className="btn btn-square text-red-500"
                  >
                    <FaRegTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* rider all info view see admin-------------------- */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={viewRef} className="modal">
        <div className="modal-box max-w-md">
          <h2 className="text-xl font-bold mb-4 text-center">
            Rider Information
          </h2>

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {riderView?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {riderView?.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {riderView?.riderPhone}
            </p>
            <p>
              <span className="font-semibold">District:</span>{" "}
              {riderView?.district || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {riderView?.region}
            </p>
            <p>
              <span className="font-semibold">Bike Model:</span>{" "}
              {riderView?.bikeModel}
            </p>
            <p>
              <span className="font-semibold">License:</span>{" "}
              {riderView?.license}
            </p>
            <p>
              <span className="font-semibold">NID:</span> {riderView?.nid}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`font-semibold px-2 py-1 rounded-full ${
                  riderView?.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {riderView?.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">About:</span> {riderView?.about}
            </p>
            <p>
              <span className="font-semibold">YourSelf:</span>{" "}
              {riderView?.yourSelf}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(riderView?.createAt).toLocaleString()}
            </p>
          </div>
          {/* close button--------------------------------------- */}
          <div className="modal-action mt-4 justify-center">
            <button
              className="w-full text-secondary font-bold btn btn-primary"
              onClick={handleRiderViewCloseButton}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRider;
