import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const API_URL = "http://localhost:5000";

export default function Analytics() {

  const [analytics, setAnalytics] = useState({});

  useEffect(() => {

    fetchAnalytics();

  }, []);
  const fetchAnalytics = async () => {

  try {

    const res = await axios.get(

      `${API_URL}/api/analytics`,

      {
        headers: {
          Authorization:
          `Bearer ${localStorage.getItem("token")}`
        }
      }

    );

    setAnalytics(res.data);

  } catch (err) {

    console.log(err);
//    console.log(analytics);
  }

 } 
 return (

  <div className="space-y-8">

    {/* Analytics Cards */}
    <div className="grid md:grid-cols-4 gap-4">

      <h2 className="text-3xl font-bold text-purple-600 mb-2 col-span-4">
        📊 Analytics Dashboard
      </h2>

      <div className="bg-white p-5 rounded-3xl shadow-lg">
        <h3 className="text-gray-500 mb-2">
          Total Images
        </h3>

        <p className="text-3xl font-bold">
          {analytics?.totalImages || 0}
        </p>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-lg">
        <h3 className="text-gray-500 mb-2">
          Average Score
        </h3>

        <p className="text-3xl font-bold text-blue-500">
          {Number(
            analytics?.averageScore || 0
          ).toFixed(1)}%
        </p>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-lg">
        <h3 className="text-gray-500 mb-2">
          Highest Score
        </h3>

        <p className="text-3xl font-bold text-green-500">
          {analytics?.highestScore || 0}%
        </p>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-lg">
        <h3 className="text-gray-500 mb-2">
          Lowest Score
        </h3>

        <p className="text-3xl font-bold text-red-500">
          {analytics?.lowestScore || 0}%
        </p>
      </div>

    </div>

    {/* Graph */}
    <div className="bg-white p-6 rounded-3xl shadow-lg">

      <h2 className="text-2xl font-bold mb-5">
        📈 CLIP Similarity Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart
          data={analytics?.trend || []}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#8b5cf6"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  </div>

);
}