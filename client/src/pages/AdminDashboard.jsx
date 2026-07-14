import { useEffect, useState } from "react";
import axios from "axios";

import AnalyticsCards
from "../components/AnalyticsCards";
import AdminChart from "../components/Chart";
import AdminNavbar from "../components/adminNavbar";

function AdminDashboard() {

  const [stats,setStats] =
  useState({

    totalUsers:0,

    totalImages:0,

    averageScore:0

  });

  const [users,setUsers] =
  useState([]);

  const[search,setsearch] =
  useState("");

  const [activities,setActivities] =
useState([]);

  useEffect(()=>{

    fetchData();

  },[]);

  const fetchData = async()=>{

    try{

      const token =
      localStorage.getItem("token");

      const statsRes =
      await axios.get(

        "https://visionai-production-5752.up.railway.app/api/admin/stats",

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );

      const usersRes =
      await axios.get(

        "http://visionai-production-5752.up.railway.app/api/admin/users",

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );
      const activityRes =
await axios.get(

 "http://visionai-production-5752.up.railway.app/api/admin/activity",

 {
  headers:{
   Authorization:
   `Bearer ${token}`
  }
 }

);
      setStats(
        statsRes.data
      );

      setUsers(
        usersRes.data
      );
      setActivities(
 activityRes.data
);

    }

    catch(error){

      console.log(error);

    }

  };
     
  const filteredUsers = users.filter(

    (user) =>

      user.username
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

  );

const deleteUser = async (userId) => {

    try {

      const token =
      localStorage.getItem("token");

      const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

      if (!confirmDelete) return;

      await axios.delete(

        `http://localhost:5000/api/admin/users/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      alert("User Deleted Successfully");

      fetchData();

    }

    catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };
 
  return(

    <div className="p-8">

      <h1
       className="
       text-3xl
       font-bold
       mb-8
       "
      >

       Admin Dashboard

      </h1>

      <AnalyticsCards

       totalUsers={
        stats.totalUsers
       }

       totalImages={
        stats.totalImages
       }

       averageScore={
        stats.averageScore
       }
       
      />
        <div className="mt-8">
    <AdminChart users={users} />
    </div>
        {/* Search */}

      <div className="mt-8">

        <input

          type="text"

          placeholder="Search User..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
          w-full
          p-3
          rounded-lg
          border
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          "

        />

      </div>
      <div
       className="
       mt-10
       bg-white
       rounded-lg
       shadow
       p-5
       "
      >
     
        <h2
         className="
         text-xl
         font-semibold
         mb-4
         "
        >

          Registered Users

        </h2>
       
<div className="mt-8 overflow-x-auto">

  <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg">

    <thead className="bg-slate-800 text-white">

      <tr>

        <th className="px-6 py-3 text-left">
          Name
        </th>

        <th className="px-6 py-3 text-left">
          Email
        </th>

        <th className="px-6 py-3 text-left">
          Role
        </th>

        <th className="px-6 py-3 text-center">
          Total Images
        </th>
        <th className="px-6 py-3 text-center">
          Actions
        </th>
      </tr>

    </thead>

    <tbody>

      {users.map((user) => (

        <tr
          key={user._id}
          className="border-b hover:bg-gray-50"
        >

          <td className="px-6 py-4">
            {user.username}
          </td>

          <td className="px-6 py-4">
            {user.email}
          </td>

          <td className="px-6 py-4">

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                user.role === "admin"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user.role}
            </span>

          </td>

          <td className="px-6 py-4 text-center font-semibold">
            {user.totalImages}
          </td>
            <td className="p-4 text-center">

                      {

                        user.role !== "admin" && (

                          <button

                            onClick={() =>
                              deleteUser(user._id)
                            }

                            className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            rounded
                            "

                          >

                            Delete

                          </button>

                        )

                      }

                    </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

<div
 className="
 mt-10
 bg-white
 rounded-xl
 shadow-lg
 p-6
 "
>

<h2
 className="
 text-xl
 font-bold
 mb-5
 "
>

 Recent Activity

</h2>

<div className="overflow-x-auto">

<table className="w-full">

<thead
 className="
 bg-slate-800
 text-white
 "
>

<tr>

<th className="p-3">
User
</th>

<th className="p-3">
Email
</th>

<th className="p-3">
Score
</th>

<th className="p-3">
Date
</th>

</tr>

</thead>

<tbody>

{
activities.map((item)=>(

<tr
 key={item._id}
 className="border-b"
>

<td className="p-3">
  {item.userId?.username || "N/A"}
</td>

<td className="p-3">
  {item.userId?.email || "N/A"}
</td>

<td className="p-3">
  {item.clipScore ?? 0}%
</td>

<td className="p-3">

 {
 new Date(
  item.createdAt
 ).toLocaleString()
 }

</td>

</tr>

))
}

</tbody>

</table>

</div>

</div>

      </div>

    </div>

  );

}

export default AdminDashboard;