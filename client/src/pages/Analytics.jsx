import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

export default function Analytics() {

  // const [analytics, setAnalytics] = useState({});
  const [analytics,setAnalytics]=useState({

totalImages:0,

averageScore:0,

highestScore:0,

lowestScore:0,

trend:[],

comparison:[],

improvement:0,
recommendation:[]

});

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
    console.log(res.data);

    setAnalytics(res.data);

  } catch (err) {

    console.log(err);
//    console.log(analytics);
  }

 } 
 const CustomTooltip = ({ active, payload }) => {

  if (active && payload && payload.length) {

    const data = payload[0].payload;

    return (

      <div className="bg-white p-4 rounded-xl shadow-lg border">

        <h3 className="font-bold text-lg">
          {data.image}
        </h3>

        <p>
          Score : <b>{data.score}%</b>
        </p>

        <p>
          Status :
          <span className="font-bold">
            {" "}{data.status}
          </span>
        </p>

        <p className="mt-2 text-gray-600">
          {data.recommendation}
        </p>

      </div>

    );

  }

  return null;

};
const getBarColor = (status) => {

  switch (status) {

    case "Excellent":
      return "#22c55e";

    case "Good":
      return "#3b82f6";

    case "Average":
      return "#facc15";

    case "Poor":
      return "#ef4444";

    default:
      return "#8b5cf6";
  }

};
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
            analytics?.averageScore?.toFixed(1) || "0.0"
          )}%
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
   
   <div className="bg-white p-6 rounded-3xl shadow-lg mt-8">

<h2 className="text-2xl font-bold mb-5">

🆚 Prompt Comparison

</h2>

<ResponsiveContainer

width="100%"

height={350}

>

<BarChart

data={analytics.comparison}

>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis

dataKey="image"

/>

<YAxis/>

<Tooltip/>

<Legend/>

<Bar

dataKey="original"

fill="#ef4444"

/>

<Bar

dataKey="refined"

fill="#10b981"

/>

</BarChart>

</ResponsiveContainer>

</div>

<div className="bg-gradient-to-r

from-green-400

to-blue-500

text-white

rounded-3xl

p-6

mt-8

shadow-lg">

<h2 className="text-2xl font-bold">

🚀 Average Prompt Improvement

</h2>

<p className="text-5xl font-bold mt-3">

{analytics?.improvement?.toFixed(1) || "0.0"}%

</p>

<p>

Prompt refinement improved image quality.

</p>

</div>

{/* <div className="bg-white

p-6

rounded-3xl

shadow-lg

mt-8">

<h2

className="text-2xl

font-bold

mb-5">

🤖 AI Recommendation

</h2>

{

analytics.recommendation.map((item,index)=>(

<div

key={index}

className="flex

justify-between

border-b

py-3">

<span>

Image {index+1}

</span>

<span>

{item.score}%

</span>

<span>

{item.status}

</span>

</div>

))

}

</div> */}
<div className="bg-white p-6 rounded-3xl shadow-lg mt-8">

  <h2 className="text-2xl font-bold mb-6">

    🤖 AI Recommendation Analysis

  </h2>

  <ResponsiveContainer
    width="100%"
    height={400}
  >

    <BarChart
      data={analytics?.recommendation || []}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="image"
      />

      <YAxis />

      <Tooltip
        content={<CustomTooltip />}
      />

      <Bar
        dataKey="score"
        radius={[10,10,0,0]}
      >

        {(analytics?.recommendation || []).map(

          (entry,index)=>(

            <Cell

              key={index}

              fill={getBarColor(entry.status)}

            />

          )

        )}

      </Bar>

    </BarChart>

  </ResponsiveContainer>

</div>
  </div>
  

);
}