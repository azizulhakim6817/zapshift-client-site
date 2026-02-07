import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "./../../../hooks/useAxiosInstance";
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
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";

const UserDashboardHome = ({ email }) => {
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();

  // 1️⃣ Fetch delivery status stats
  const {
    data: statusStats = [],
    isLoading: statusLoading,
    isError: statusError,
  } = useQuery({
    queryKey: ["user-delivery-status-stats", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/user/delivery-status-stats?email=${user?.email}`,
      );
      return res.data;
    },
  });

  // 2️⃣ Fetch per-day delivered parcels
  const {
    data: perDayStats = [],
    isLoading: perDayLoading,
    isError: perDayError,
  } = useQuery({
    queryKey: ["user-delivery-per-day", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/user/delivery-per-day?email=${user?.email}`,
      );
      return res.data;
    },
  });

  if (statusLoading || perDayLoading)
    return <p className="text-center mt-4">Loading...</p>;

  if (statusError || perDayError)
    return <p className="text-center mt-4 text-red-500">Error loading data</p>;

  // Map data for charts
  const pieData = statusStats.map((item) => ({
    name: item._id.replaceAll("_", " "),
    value: item.count,
  }));

  const COLORS = pieData.map((_, i) => `hsl(${i * 60}, 70%, 50%)`);

  return (
    <div className="mx-4 md:mx-8 mt-4 md:mt-8">
      {/* ----------------- Delivery Status Cards ---------------- */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        {statusStats.map((stat, i) => (
          <div
            key={i}
            className="stat bg-white rounded-lg p-4 shadow-md w-40 text-center"
          >
            <div className="stat-title font-semibold text-gray-600">
              {stat._id.replaceAll("_", " ")}
            </div>
            <div className="stat-value text-2xl font-bold text-blue-600">
              {stat.count}
            </div>
            <div className="stat-desc text-sm text-gray-500">Parcels</div>
          </div>
        ))}
      </div>

      {/* ----------------- Pie Chart: Delivery Status ---------------- */}
      <div className="flex justify-center mb-8">
        {/*  <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              isAnimationActive={true}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </ResponsiveContainer> */}
      </div>

      {/* ----------------- Bar Chart: Per-day Delivered ---------------- */}
      <div className="flex justify-center w-full">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={pieData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashboardHome;
