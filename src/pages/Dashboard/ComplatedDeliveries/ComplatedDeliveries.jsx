import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ComplatedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //! get parcel_delivered all data--------------------------
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "parcel_delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcel/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`,
      );
      return res.data;
    },
  });

  //! parcel calculate rider cost tk.------------
  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.reciverDistrict) {
      return parcel?.cost * 0.8;
    } else {
      return parcel?.cost * 0.6;
    }
  };

  return (
    <div>
      <h1
        className="mt-2 text-secondary
           text-center font-bold text-xl"
      >
        Complated Deliveries :
        <span className="text-primary">( {parcels?.length} )</span> ✅
      </h1>
      {/* table-------------------------------------- */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Total Cost</th>
              <th>Rider Payout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.createAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.cost}</td>
                <td>{calculatePayout(parcel)}</td>
                <td>
                  <button
                    /*  onClick={() => openAssignRiderModal(parcel)} */
                    className="btn btn-primary text-secondary"
                  >
                    Cash Out
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

export default ComplatedDeliveries;
