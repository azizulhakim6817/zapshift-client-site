import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef(null);
  const [selectedParcel, setSelectedParcel] = useState(null);
  //console.log(selectedParcel);

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return res.data;
    },
  });

  //! get riders all--------------------------
  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`,
      );
      return res.data;
    },
  });

  //! open Assign rider modal---------------------
  const openAssignRiderModal = (parcel) => {
    riderModalRef.current.showModal();
    setSelectedParcel(parcel);
  };

  //! handle assign rider---------------------------------
  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider?._id,
      riderEmail: rider?.email,
      riderName: rider?.name,
      parcelId: selectedParcel?._id,
      trackingId: selectedParcel.trackingId,
    };
    axiosSecure
      .patch(`update-parcel/${selectedParcel?._id}`, riderInfo)
      .then((res) => {
        refetch();
        //console.log("modifyed: ", res.data);
        riderModalRef.current.close();
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Rider has assingend successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h1
        className="mt-2 text-secondary
           text-center font-bold text-xl"
      >
        Parcel selete by Assign Riders :
        <span className="text-primary">( {parcels?.length} )</span> 🚚
      </h1>
      {/* table-------------------------------------- */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{parcel.createAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => openAssignRiderModal(parcel)}
                    className="btn btn-primary text-secondary"
                  >
                    Find Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={riderModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Riders : {riders?.length}</h3>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {riders?.map((rider, i) => (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{rider?.name}</td>
                    <td>{rider?.email}</td>
                    <td>
                      <button
                        onClick={() => handleAssignRider(rider)}
                        className="btn btn-primary text-secondary"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              onClick={() => riderModalRef.current.close()}
              className="flex justify-end"
            >
              <button className="btn mr-4">Close</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
