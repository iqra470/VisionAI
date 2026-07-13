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
const comparison = history.map((item, index) => ({

  image: `Img ${index + 1}`,

  original: item.originalScore || 0,

  refined: item.clipScore || 0

}));
let improvement = 0;

comparison.forEach(item=>{

improvement +=

item.refined-item.original;

});

improvement=

comparison.length

?

improvement/comparison.length

:

0;

const recommendation = history.map((item, index) => {

  let status = "";
  let recommendationText = "";

  if (item.clipScore >= 90) {

    status = "Excellent";
    recommendationText = "Ready for production.";

  }

  else if (item.clipScore >= 80) {

    status = "Good";
    recommendationText = "Minor prompt refinement recommended.";

  }

  else if (item.clipScore >= 70) {

    status = "Average";
    recommendationText = "Improve prompt details for better quality.";

  }

  else {

    status = "Poor";
    recommendationText = "Regenerate image using refined prompt.";

  }

  return {

    image: `Image ${index + 1}`,   // 👈 XAxis ke liye

    score: item.clipScore || 0,    // 👈 Bar ki height

    status,                        // 👈 Color ke liye

    recommendation: recommendationText // 👈 Tooltip/Card ke liye

  };

});
    res.json({
      totalImages,
      averageScore,
      highestScore,
      lowestScore,
      comparison,
      improvement,
      recommendation,
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