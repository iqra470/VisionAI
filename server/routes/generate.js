const express = require("express");

const router = express.Router();

const axios = require("axios");

const FormData = require("form-data");

const ImageHistory = require("../models/ImageHistory");

const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

// =====================================================
// FLASK / NGROK URL
// =====================================================

const AI_URL =
  "https://euphemism-helpless-unfitted.ngrok-free.dev";


// =====================================================
// GENERATE PROMPT
// =====================================================

router.post("/", async (req, res) => {

  try {

    // check image
    if (!req.files || !req.files.image) {

      return res.status(400).json({

        success: false,

        message: "No image uploaded",
      });
    }

    // image from frontend
    const image = req.files.image;

    // form data
    const formData = new FormData();

    formData.append(
      "image",
      image.data,
      image.name
    );

    // call flask
    const response = await axios.post(

      `${AI_URL}/generate`,

      formData,

      {
        headers: formData.getHeaders(),

        maxContentLength: Infinity,

        maxBodyLength: Infinity,
      }
    );
    const { caption, prompt } = response.data;
    console.log("Generate User:", req.user);

    const history = await ImageHistory.create({

      userId: req.user.id, // JWT middleware se

      caption,

      prompt,

      originalImage: image.data.toString("base64"),

    });

    console.log(
      "History Created:",
      history._id
    );

    res.json({

      ...response.data,

      historyId: history._id

    });

    // // send frontend
    // res.status(200).json({ ...response.data,  historyId: history._id })


  } catch (err) {

    console.log("❌ Generate Prompt Error");

    console.log(
      err.response?.data || err.message
    );

    res.status(500).json({

      success: false,

      message: "Error generating prompt",
    });
  }
});

// refine prompt
router.post(
  "/refine-prompt",
  async (req, res) => {

    try {

      const {
        prompt,
        enhancements
      }
        =
        req.body;

      const response =
        await axios.post(

          `${AI_URL}/refine-prompt`,

          {
            prompt,
            enhancements
          }

        );

      res.json(
        response.data
      );

    }
    catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Refinement failed"
      });

    }

  });
// =====================================================
// GENERATE IMAGE
// =====================================================

router.post("/image", async (req, res) => {

  try {

    const { prompt, historyId ,originalImage} = req.body;

    // validate
    if (!prompt) {

      return res.status(400).json({

        success: false,

        message: "Prompt is required",
      });
    }

    // call flask
    const response = await axios.post(

      `${AI_URL}/generate-image`,

      {
        prompt,
        originalImage,
        mode:req.body.mode || "original"
      }
    );
    await ImageHistory.findByIdAndUpdate(

      historyId,

      {
        generatedImage: response.data.generatedImage,
        clipScore: response.data.clipScore,
      }

    );

    // send frontend
    // res.status(200).json(response.data);
    res.json({

success:true,

generatedImage:
response.data.generatedImage,

clipScore:
response.data.clipScore,

mode:
response.data.mode

});

  } catch (err) {

    console.log("❌ Generate Image Error");

    console.log(
      err.response?.data || err.message
    );

    res.status(500).json({

      success: false,

      message: "Error generating image",
    });
  }
});


// =====================================================
//save refined prompt
// =====================================================
router.post(
  "/save-refinement",

  authMiddleware,

  async (req, res) => {

    try {

      const {

        historyId,

        refinedPrompt,

        enhancements

      }
        =
        req.body;

      await ImageHistory.findByIdAndUpdate(

        historyId,

        {

          refinedPrompt,

          selectedEnhancements:
            enhancements

        }

      );

      res.json({

        success: true

      });

    }
    catch (err) {

      console.log(err);

      res.status(500).json({

        message:
          "Save failed"

      });

    }

  });
// =====================================================
// CLIP SCORE
// =====================================================

router.post("/clip-score", async (req, res) => {

  try {

    // validate files
    if (
      !req.files ||
      !req.files.original ||
      !req.files.generated
    ) {

      return res.status(400).json({

        success: false,

        message: "Images are required",
      });
    }

    const formData = new FormData();

    // original image
    formData.append(
      "original",
      req.files.original.data,
      req.files.original.name
    );

    // generated image
    formData.append(
      "generated",
      req.files.generated.data,
      req.files.generated.name
    );
    const historyId = req.body.historyId;
    // call flask
    const response = await axios.post(

      `${AI_URL}/clip-score`,

      formData,

      {
        headers: formData.getHeaders(),

        maxContentLength: Infinity,

        maxBodyLength: Infinity,
      }
    );
    if (historyId) {


      await ImageHistory.findByIdAndUpdate(

        historyId,

        {
          clipScore:
            response.data.similarity_score
        }

      );
    }
    // send frontend
    res.status(200).json(response.data);
    console.log("History ID:", historyId);

    console.log(
      "Similarity:",
      response.data.similarity_score
    );
  } catch (err) {

    console.log("❌ CLIP Score Error");

    console.log(
      err.response?.data || err.message
    );

    res.status(500).json({

      success: false,

      message: "CLIP score failed",
    });
  }
});


// =====================================================
// EXPORT
// =====================================================

module.exports = router;