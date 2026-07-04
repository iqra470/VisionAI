const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/auth");

const ImageHistory =
require("../models/ImageHistory");

router.get(

  "/",

  authMiddleware,

  async (req, res) => {
console.log("Logged User:", req.user.id);
    try {

      const history =
      await ImageHistory.find({

        userId: req.user.id,

      })

      .sort({
        createdAt: -1,
      });
      console.log("History Found:", history);

      res.json(history);

    } catch (err) {

      res.status(500).json({
        message:
        "History error",
      });

    }

  }

);

module.exports =
router;