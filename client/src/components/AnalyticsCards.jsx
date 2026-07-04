function AnalyticsCards({

  totalUsers,
  totalImages,
  averageScore

}) {

  return (

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-gray-500">
          Total Users
        </h3>

        <p className="text-3xl font-bold mt-2">
          {totalUsers}
        </p>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-gray-500">
          Total Images
        </h3>

        <p className="text-3xl font-bold mt-2">
          {totalImages}
        </p>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h3 className="text-gray-500">
          Average Score
        </h3>

        <p className="text-3xl font-bold mt-2">
          {averageScore}
        </p>

      </div>

    </div>

  );

}

export default AnalyticsCards;