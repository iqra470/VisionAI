const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth");
const ImageHistory = require("../models/ImageHistory");

router.get("/", authMiddleware, async (req, res) => {

  try {

    const history = await ImageHistory.find({
      userId: req.user.id
    });

    const totalImages = history.length;

    const scores = history
      .filter(item => item.clipScore)
      .map(item => item.clipScore);

    const averageScore =
      scores.length > 0
        ? scores.reduce((a, b) => a + b, 0) / scores.length
        : 0;

    const highestScore =
      scores.length > 0
        ? Math.max(...scores)
        : 0;

    const lowestScore =
      scores.length > 0
        ? Math.min(...scores)
        : 0;

    res.json({
      totalImages,
      averageScore,
      highestScore,
      lowestScore,
      trend: history.map(item => ({
        date: item.createdAt,
        score: item.clipScore || 0
      }))
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Analytics error"
    });

  }

});

module.exports = router;