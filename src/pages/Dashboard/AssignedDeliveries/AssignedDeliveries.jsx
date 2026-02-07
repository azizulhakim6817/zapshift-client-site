import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assinged"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcel/rider?riderEmail=${user?.email}&deliveryStatus=driver_assinged`,
      );

      return res.data;
    },
  });

  //! update parcel delivery status-------------------------
  const handleDeliveryStatusUpdate = async (parcel, status) => {
    const parcelInfo = {
      deliveryStatus: status,
      riderId: parcel?.riderId,
      trackingId: parcel?.trackingId,
    };
    const message = `Pacel Status is updated with ${status?.split(`_`).join(" ")}`;

    const res = await axiosSecure.patch(
      `/parcel/${parcel?._id}/status`,
      parcelInfo,
    );
    refetch();
    if (res.data?.modifiedCount) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <h1
        className="mt-2 text-secondary
           text-center font-bold text-xl"
      >
        Parcels pending Pickup :
        <span className="text-primary">( {parcels?.length} )</span> 🚚
      </h1>
      {/* table------------------ */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone+</th>
              <th>Email</th>
              <th>Confirm</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel?.parcelName}</td>
                <td>{parcel?.reciverPhone}</td>
                <td>{parcel?.receiverEmail}</td>

                <td className="space-x-1">
                  {parcel?.deliveryStatus === "driver_assinged" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "rider_arriving")
                        }
                        className="btn btn-success text-secondary"
                      >
                        Accept
                      </button>
                      {/* reject--------- */}
                      <button className="btn btn-error text-secondary">
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <span>
                        <p className="text-success font-bold">Accepted</p>
                      </span>
                    </>
                  )}
                  {/* accept--------- */}
                </td>
                <td className="space-x-1">
                  {/* deliveryStatus --> parcel_picked_up------------ */}
                  {parcel?.deliveryStatus === "parcel_picked_up" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                        }
                        className="btn btn-secondary font-bold text-primary"
                      >
                        Parcel as a Picked-up
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                        }
                        className="btn btn-primary font-bold text-secondary"
                      >
                        Parcel as a Picked-up
                      </button>
                    </>
                  )}

                  {/*deliveryStatus --->  parcel_delivered------------ */}
                  {parcel?.deliveryStatus === "parcel_delivered" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                        }
                        className="btn   btn-secondary font-bold text-primary"
                      >
                        Parcel as Delivered
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                        }
                        className="btn btn-primary font-bold text-secondary"
                      >
                        Parcel as Delivered
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
