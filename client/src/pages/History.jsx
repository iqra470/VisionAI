import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const res = await axios.get(

        `${API_URL}/api/history`,

        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }

      );

      console.log("History Data:", res.data);

      setHistory(res.data);

    } catch (err) {

      console.log(err);

    }

  };
  return (

  <div className="bg-white p-6 rounded-3xl shadow-lg mt-6">

  <h2 className="text-3xl font-bold text-purple-600 mb-6">
    📜 My AI History
  </h2>

  {history.length === 0 ? (

    <div className="text-center py-8 text-gray-500">
      No history found yet 🚀
    </div>

  ) : (

    <div className="space-y-4">

      {history.map((item, index) => (

        <div
          key={item._id}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5 hover:shadow-xl transition-all duration-300"
        >

          <div className="flex justify-between items-center mb-3">

            <h3 className="font-bold text-lg text-purple-700">
              Generation #{history.length - index}
            </h3>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {item.clipScore || 0}%
            </span>

          </div>

          <div className="mb-3">

            <p className="font-semibold text-gray-700 mb-1">
              🧠 Caption
            </p>

            <p className="text-gray-600 bg-white p-3 rounded-xl">
              {item.caption}
            </p>

          </div>

          <div>

            <p className="font-semibold text-gray-700 mb-1">
              ✨ Optimized Prompt
            </p>

            <div className="bg-white p-3 rounded-xl max-h-32 overflow-y-auto text-gray-600">
              {item.prompt}
            </div>

          </div>

          <div className="mt-4 flex justify-between items-center">

            <span className="text-sm text-gray-500">
              📅 {new Date(item.createdAt).toLocaleDateString()}
            </span>

            <div className="w-40">

              <div className="bg-gray-200 h-3 rounded-full">

                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
                  style={{
                    width: `${item.clipScore || 0}%`
                  }}
                ></div>

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</div>

  );
}

