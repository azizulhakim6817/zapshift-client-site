import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "./../../../hooks/useAxiosInstance";
import useAuth from "./../../../hooks/useAuth";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const RiderDashboardHome = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();

  // Fetch delivery per day data
  const {
    data: deliveryStats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["delivery-per-day", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/rider/delivery-per-day?email=${user?.email}`,
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError)
    return <p className="text-center mt-4 text-red-500">Error loading data</p>;

  // Prepare data for PieChart & BarChart
  const chartData = deliveryStats.map((item) => ({
    name: item._id.date,
    value: item.count,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4C4C"];

  return (
    <div className="mx-4 md:mx-8 mt-4 md:mt-8">
      {/* ----------------- Stats Cards ---------------- */}
      <div className=" mb-8 flex flex-wrap gap-4 justify-center">
        {deliveryStats.map((stat, i) => (
          <div
            key={i}
            className="stat bg-white rounded-lg p-4 shadow-md w-40 text-center"
          >
            <div className="stat-title font-semibold text-gray-600">
              {stat._id.date}
            </div>
            <div className="stat-value text-2xl font-bold text-blue-600">
              {stat.count}
            </div>
            <div className="stat-desc text-sm text-gray-500">Delivered</div>
          </div>
        ))}
      </div>

      {/* ----------------- Straight Angle Pie Chart ---------------- */}
      <div className="flex justify-center mb-8">
        <PieChart width={500} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            startAngle={180}
            endAngle={0}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            label
            isAnimationActive={true}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </div>

      {/* ----------------- Bar Chart ---------------- */}
      <div className="flex justify-center">
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default RiderDashboardHome;
