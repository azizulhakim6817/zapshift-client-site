import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "./../../../hooks/useAxiosInstance";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const AdminDashboardHome = () => {
  const axiosInstance = useAxiosInstance();

  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/parcels/delivery-status/stats/aggregation/pipeline`,
      );
      console.log(res.data);
      return res.data;
    },
  });

  //! * StraightAnglePieChart--------- */
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const StraightAnglePieChart = (data) => {
    return data.map((item) => ({
      name: item.status,
      value: item.count,
    }));
  };

  return (
    <div className=" mx-8 mt-4 md:mt-8 ">
      <div className="stats shadow">
        {deliveryStats?.map((stat, i) => (
          <>
            <div key={i} className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">{stat?._id}</div>
              <div className="stat-value">{stat?.count}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
          </>
        ))}
      </div>
      {/* Straight Angle Pie Chart--------- */}
      <div className="w-full h-100">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 2,
          }}
        >
          <Pie
            data={StraightAnglePieChart(deliveryStats)}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            label
            isAnimationActive={true}
          >
            {StraightAnglePieChart(deliveryStats).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
