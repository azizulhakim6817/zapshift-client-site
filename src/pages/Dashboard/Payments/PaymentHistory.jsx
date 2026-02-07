import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory } = useQuery({
    queryKey: ["paymentsHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`get-payments?email=${user?.email}`);
      //console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="my-2 text-center font-bold text-xl">
        Payment History{" "}
        <span className="text-primary">
          ( <span className="text-secondary">{paymentHistory?.length}</span> )
        </span>
      </h1>
      {/* payment history table data */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Payment History Name</th>
              <th>Amount</th>
              <th>Paid-Date</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?.map((payHistory, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{payHistory?.parcelName}</td>
                <td>{payHistory?.amount}</td>
                <td>{new Date(payHistory?.paidAt).toLocaleDateString()}</td>
                <td>{payHistory.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
