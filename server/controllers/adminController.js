const User = require("../models/User");
const Result = require("../models/ImageHistory");



exports.getAllUsers = async (req, res) => {

  try {

    const users = await User.aggregate([

      {

        $lookup: {

          from: "imagehistories",

          localField: "_id",

          foreignField: "userId",

          as: "images"

        }

      },

      {

        $project: {

          username: 1,

          email: 1,

          role: 1,

          createdAt: 1,

          totalImages: {

            $size: "$images"

          }

        }

      }

    ]);

    res.json(users);

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};
exports.getAdminStats = async (req, res) => {

  try {

    const totalUsers =
      await User.countDocuments();

    const totalImages =
      await Result.countDocuments();

    const results =
      await Result.find();

   const averageScore =
  results.length > 0
    ? (
        results.reduce(
          (sum, item) =>
            sum + (item.clipScore || 0),
          0
        ) / results.length
      ).toFixed(2)
    : 0;

    res.json({

      totalUsers,

      totalImages,

      averageScore

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
  
  
};
exports.deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "User Deleted Successfully"
    });

  }

  catch(error){

    res.status(500).json({
      message: error.message
    });

  }

};
exports.getRecentActivity = async (req, res) => {

  try {

    const activities = await Result.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 })
      .limit(10);

      console.log(activities);
    res.json(activities);

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};