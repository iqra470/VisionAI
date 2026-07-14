import { useState, useEffect } from "react";
import axios from "axios";
import ClipComparisonChart from "../components/ClipComparisonChart";

export default function Dashboard() {

  // =====================================================
  // STATES
  // =====================================================

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");

  const [generatedImage, setGeneratedImage] = useState(null);

  const [similarityScore, setSimilarityScore] = useState(null);

  const [historyId, setHistoryId] = useState(null);

  const [history, setHistory] = useState([]);

  const [showEditor, setShowEditor] = useState(false);

  const [enhancements, setEnhancements] = useState([]);

  const [refinedPrompt, setRefinedPrompt] = useState("");

  const [currentStep, setCurrentStep] = useState(1);

  const [originalGeneratedImage, setOriginalGeneratedImage] = useState("");
  const [enhancedGeneratedImage, setEnhancedGeneratedImage] = useState("");

  const [originalClipScore, setOriginalClipScore] = useState(0);
  const [enhancedClipScore, setEnhancedClipScore] = useState(0);

  const [uploadedImage, setUploadedImage] = useState("");

  const MAX_TRIALS = 3;

const [remainingTrials,setRemainingTrials]=useState(MAX_TRIALS);

  const options = [

    "Ultra Realistic",

    "Cinematic Lighting",

    "Professional Photography",

    "Better Colors",

    "8K Quality",

    "Detailed Background",

    "Artistic Style",

    "Product Photography",

    "Sharp Focus",

    "Soft Shadows",

    "Hyper Realistic",

  ];

  const resetDashboard = () => {

    setImage(null);

    setResult(null);

    setPrompt("");

    setRefinedPrompt("");

    setGeneratedImage("");

    setSimilarityScore("");

    setEnhancements([]);

    setCurrentStep(1);

    setShowEditor(false);
    setOriginalGeneratedImage("");
    setEnhancedGeneratedImage("");
    setOriginalClipScore(0);
    setEnhancedClipScore(0);
    setUploadedImage("");
    setPreview(null);


  }

  // =====================================================
  // API URL
  // =====================================================

  const API_URL = "http://visionai-production-5752.up.railway.app";



  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  // const handleUpload = (file) => {

  //   if (!file) return;

  //   setImage(file);

  //   setPreview(URL.createObjectURL(file));

  //   setResult(null);
  //   setCurrentStep(2);

  //   setGeneratedImage(null);

  //   setSimilarityScore(null);
  //   // setUploadedImage(file);
  // };

  const handleUpload = (file) => {

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));

    setResult(null);

    setGeneratedImage(null);

    setSimilarityScore(null);

    setCurrentStep(2);

    // Convert image into Base64
    const reader = new FileReader();

    reader.onloadend = () => {

      // remove "data:image/png;base64,"
      const base64 = reader.result.split(",")[1];

      setUploadedImage(base64);

    };

    reader.readAsDataURL(file);

  };



  // =====================================================
  // GENERATE PROMPT
  // =====================================================

  const handleGenerate = async () => {

    if (!image) {

      alert("Please upload image");

      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);

      const res = await axios.post(

        `${API_URL}/api/generate`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,

            "Content-Type":
              "multipart/form-data"
          },
        }
      );

      console.log(res.data);

      setResult(res.data);
      setCurrentStep(3);

      setPrompt(res.data.prompt);

      setLoading(false);
      setHistoryId(res.data.historyId);

    } catch (err) {

      console.log(err);

      alert("Error generating result");

      setLoading(false);
    }
  };

  // =====================================================
  // refine prompt
  // =====================================================
  const handleRefinePrompt = async () => {

  // Check remaining trials
  if (remainingTrials === 0) {

    alert("❌ No enhancement attempts remaining.");

    return;
  }

  try {

    const res = await axios.post(

      `${API_URL}/api/generate/refine-prompt`,

      {
        prompt,
        enhancements
      },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }

    );

    setRefinedPrompt(
      res.data.refinedPrompt
    );

    // Decrease trials
    setRemainingTrials(prev => prev - 1);

    setCurrentStep(6);

  }

  catch (err) {

    console.log(err);

  }

};


  // =====================================================
  // GENERATE IMAGE
  // =====================================================

  // const handleGenerateImage = async () => {

  //   try {

  //     setLoading(true);

  //     const finalPrompt =
  //       refinedPrompt
  //         ? refinedPrompt
  //         : prompt;

  //     const res = await axios.post(

  //       `${API_URL}/api/generate/image`,

  //       {
  //         prompt: finalPrompt,
  //         historyId,
  //         // originalImage: uploadedImage
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //         }
  //       }
  //     );

  //     console.log(res.data);

  //   //    if(!refinedPrompt){

  //   //   setOriginalGeneratedImage(
  //   //     res.data.image
  //   //   );

  //   //   setOriginalClipScore(
  //   //     res.data.clipScore
  //   //   );

  //   // }
  //   //   else{

  //   //   setEnhancedGeneratedImage(
  //   //     res.data.image
  //   //   );

  //   //   setEnhancedClipScore(
  //   //     res.data.clipScore
  //   //   );

  //   // }


  //     setGeneratedImage(res.data.image);
  //     setCurrentStep(7);

  //     setLoading(false);

  //   } catch (err) {

  //     console.log(err);

  //     alert("Error generating image");

  //     setLoading(false);
  //   }
  // };

  const handleGenerateImage = async () => {

    try {

      setLoading(true);

      const finalPrompt =
        refinedPrompt
          ? refinedPrompt
          : prompt;

      const res = await axios.post(

        `${API_URL}/api/generate/image`,

        {

          prompt: finalPrompt,

          historyId,

          originalImage: uploadedImage,

          mode: refinedPrompt
            ? "enhanced"
            : "original"

        },

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

      console.log(res.data);

      // Generated Image
      setGeneratedImage(
        res.data.generatedImage
      );

      // CLIP Score
      setSimilarityScore(
        res.data.clipScore
      );

      // Store Original / Enhanced scores separately
      if (!refinedPrompt) {

        setOriginalGeneratedImage(
          res.data.generatedImage
        );

        setOriginalClipScore(
          res.data.clipScore
        );

      }

      else {

        setEnhancedGeneratedImage(
          res.data.generatedImage
        );

        setEnhancedClipScore(
          res.data.clipScore
        );

      }

      setCurrentStep(8);

      setLoading(false);

    }

    catch (err) {

      console.log(err);

      alert("Error generating image");

      setLoading(false);

    }

  };



  const downloadImage = () => {

    const link = document.createElement("a");

    link.href = `data:image/png;base64,${generatedImage}`;

    link.download = "AI_Image.png";

    link.click();

  }

  const saveHistory = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.post(

        "http://localhost:5000/api/save-result",

        {

          caption: result.caption,

          prompt: refinedPrompt,

          clipScore: similarityScore,

          image: generatedImage

        },

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      alert("Saved Successfully");

      setCurrentStep(8);

    }

    catch (error) {

      console.log(error);

    }

  }



  // =====================================================
  // CLIP SCORE
  // =====================================================
  console.log("History ID:", historyId);
  const handleClipScore = async () => {

    try {

      if (!generatedImage) {

        alert("Generate image first");

        return;
      }

      const formData = new FormData();

      formData.append("original", image);
      formData.append("historyId", historyId);

      // base64 → blob
      const response = await fetch(
        `data:image/png;base64,${generatedImage}`
      );

      const blob = await response.blob();

      formData.append(
        "generated",
        blob,
        "generated.png"
      );

      const res = await axios.post(

        `${API_URL}/api/generate/clip-score`,

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`,

            "Content-Type":
              "multipart/form-data"
          },
        }
      );

      console.log(res.data);

      setSimilarityScore(
        res.data.similarity_score
      );
      setCurrentStep(8);
    } catch (err) {

      console.log(err);

      alert("Error calculating similarity");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 p-6">

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        AI Vision Dashboard
      </h1>

      <div className="grid md:grid-cols-1 gap-8 max-w-6xl mx-auto">

        {/* ===================================================== */}
        {/* LEFT SIDE */}
        {/* ===================================================== */}

        <div className="space-y-5">

          {/* UPLOAD BOX */}
          <div
            className="w-full max-w-lg h-80 mx-auto border-2 border-dashed border-purple-400
             bg-white rounded-3xl overflow-hidden cursor-pointer
             hover:shadow-xl transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain bg-gray-100"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-6xl">📤</p>
                <p className="mt-3 text-lg font-semibold text-gray-700">
                  Click or Drag Image to Upload
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, JPEG
                </p>
              </div>
            )}

            <input
              id="fileInput"
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </div>

          {/* IMAGE PREVIEW */}
          {/* {preview && (
            <div className="bg-white p-2 rounded-3xl shadow-lg w-fit mx-auto">
              <img
                src={preview}
                alt="preview"
                className="rounded-2xl w-104 h-104 object-cover"
              />
            </div>
          )} */}

          {/* GENERATE BUTTON */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerate}
              className="w-102 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg"
            >
              ✨ Generate AI Prompt
            </button>
          </div>
        </div>


        {/* ===================================================== */}
        {/* RIGHT SIDE */}
        {/* ===================================================== */}

        <div className="space-y-6">

          {/* LOADING */}
          {loading && (

            <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500 mx-auto mb-4"></div>

              <p className="text-gray-700 text-lg">
                AI Model Processing...
              </p>

            </div>
          )}


          {/* RESULT */}
          {result && (

            <>

              {/* CAPTION */}
              <div className="bg-white p-6 rounded-3xl shadow-lg">

                <h3 className="text-2xl font-bold text-purple-600 mb-3">
                  🧠 Generated Caption
                </h3>

                <p className="text-gray-700">
                  {result.caption}
                </p>

              </div>


              {/* PROMPT */}
              <div className="bg-white p-6 rounded-3xl shadow-lg">

                <h3 className="text-2xl font-bold text-indigo-600 mb-3">
                  ✨ Optimized Prompt
                </h3>

                <textarea
                  value={prompt}
                  onChange={(e) =>
                    setPrompt(e.target.value)
                  }
                  className="w-full h-40 bg-gray-100 p-4 rounded-2xl outline-none"
                />

                {/* BUTTONS */}
                <div className="flex gap-4 mt-4 flex-wrap">

                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(prompt)
                    }
                    className="bg-blue-500 text-white px-5 py-2 rounded-xl"
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={handleGenerateImage}
                    className="bg-yellow-500 text-white px-5 py-2 rounded-xl"
                  >
                    ✏️ original image
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mt-8">

                  <div className="bg-purple-100 rounded-2xl p-5">

                    <h3 className="font-bold">

                      Characters

                    </h3>

                    <p className="text-3xl">

                      {prompt.length}

                    </p>

                  </div>

                  <div className="bg-blue-100 rounded-2xl p-5">

                    <h3 className="font-bold">

                      Words

                    </h3>

                    <p className="text-3xl">

                      {prompt.split(" ").length}

                    </p>

                  </div>

                  <div className="bg-green-100 rounded-2xl p-5">

                    <h3 className="font-bold">

                      Status

                    </h3>

                    <p className="text-2xl">

                      Ready ✅

                    </p>

                  </div>
                  <div>

                    <h2>Original Prompt Image</h2>

                    <img
                      src={`data:image/png;base64,${originalGeneratedImage}`}
                    />

                    <p>

                      CLIP Score

                      {originalClipScore}%

                    </p>

                  </div>

                </div>

              </div>
             
              {
                currentStep >= 6 && (
                  <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

                    <div className="flex items-center gap-4 mb-6">

                      <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-3xl">

                        🎨

                      </div>

                      <div>
                        <p className="text-gray-500">

                          Generate AI Image

                        </p>

                      </div>

                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6">

                      <p className="text-lg text-gray-700">

                        Your original prompt image is ready.

                        Do you want to enhance your prompt?

                      </p>

                    </div>
                   

                    <button
                      disabled={remainingTrials === 0}
                      onClick={() =>
                      setShowEditor(!showEditor)
                    }

                      className="

mt-8

w-full

bg-gradient-to-r

from-pink-500

to-purple-600

text-white

py-4

rounded-2xl

font-bold

text-lg

hover:scale-105

transition

"

                    >

                      Edit Prompt & Generate Enhanced Images

                    </button>

                  </div>


                )
              }
 {showEditor && (

                <div className="bg-white p-6 rounded-3xl shadow-lg">
                   <p className="text-sm text-red-500 mb-4">

Remaining Enhancement Attempts:
<strong> {remainingTrials}</strong>

</p>
                  <h3 className="text-xl font-bold mb-4">
                    Prompt Enhancement Options
                  </h3>

                  <p className="text-gray-500 mb-5">
                    Select features to improve your prompt
                  </p>

                  <div className="grid md:grid-cols-2 gap-3">

                    {options.map((item) => (

                      <label

                        key={item}

                        className="
        flex
        items-center
        gap-3
        bg-gray-100
        p-3
        rounded-xl
        hover:bg-purple-100
        cursor-pointer
        "

                      >

                        <input

                          type="checkbox"

                          checked={
                            enhancements.includes(item)
                          }

                          onChange={() => {

                            if (
                              enhancements.includes(item)
                            ) {

                              setEnhancements(

                                enhancements.filter(
                                  x => x !== item
                                )

                              );

                            }

                            else {

                              setEnhancements([

                                ...enhancements,

                                item

                              ]);

                            }

                          }}

                        />

                        {item}

                      </label>

                    ))}

                  </div>

                  <button

                    onClick={handleRefinePrompt}

                    className="
    mt-5
    w-full
    bg-gradient-to-r
    from-green-500
    to-emerald-600
    text-white
    py-3
    rounded-2xl
    font-semibold
    "

                  >

                    🚀 Generate Optimized Prompt

                  </button>

                </div>

              )}

              {/* REFINED PROMPT */}
              {refinedPrompt && (

                <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

                  <h2 className="text-3xl font-bold text-center mb-8">

                    📊 Prompt Comparison

                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">

                    <div>

                      <h3 className="text-xl font-bold text-blue-600 mb-3">

                        Original Prompt

                      </h3>

                      <textarea

                        value={prompt}

                        readOnly

                        className="

w-full

h-64

bg-blue-50

rounded-xl

p-5

"

                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-green-600 mb-3">

                        Enhanced Prompt

                      </h3>

                      <textarea

                        value={refinedPrompt}

                        readOnly

                        className="

w-full

h-64

bg-green-50

rounded-xl

p-5

"

                      />

                    </div>


                  </div>
                  <div className="grid md:grid-cols-4 gap-5 mt-8">

                    <div className="bg-purple-100 rounded-2xl p-5">

                      <h3 className="font-semibold">

                        Original Length

                      </h3>

                      <p className="text-3xl font-bold">

                        {prompt.length}

                      </p>

                    </div>

                    <div className="bg-green-100 rounded-2xl p-5">

                      <h3 className="font-semibold">

                        Enhanced Length

                      </h3>

                      <p className="text-3xl font-bold">

                        {refinedPrompt.length}

                      </p>

                    </div>

                    <div className="bg-blue-100 rounded-2xl p-5">

                      <h3 className="font-semibold">

                        Selected Features

                      </h3>

                      <p className="text-3xl font-bold">

                        {enhancements.length}

                      </p>

                    </div>

                    <div className="bg-yellow-100 rounded-2xl p-5">

                      <h3 className="font-semibold">

                        AI Status

                      </h3>

                      <p className="text-2xl">

                        Optimized ✅

                      </p>

                    </div>

                  </div>
                  <button
                    onClick={() => setCurrentStep(7)}
                    className="bg-purple-500 text-white px-5 py-2 rounded-xl"
                  >
                    🎨 Continue to Image Generation
                  </button>
                 
                </div>
                
              )}
               {
                currentStep >= 7 && (

                  <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

                    <div className="flex items-center gap-4 mb-6">

                      <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-3xl">

                        🎨

                      </div>

                      <div>

                        <h2 className="text-3xl font-bold text-pink-600">

                          Step 6

                        </h2>

                        <p className="text-gray-500">

                          Generate AI Image

                        </p>

                      </div>

                    </div>

                    <div className="bg-gray-100 rounded-2xl p-6">

                      <p className="text-lg text-gray-700">

                        Your enhanced prompt is ready.

                        Click below to generate the final AI image.

                      </p>

                    </div>

                    <button

                      onClick={handleGenerateImage}

                      className="

mt-8

w-full

bg-gradient-to-r

from-pink-500

to-purple-600

text-white

py-4

rounded-2xl

font-bold

text-lg

hover:scale-105

transition

"

                    >

                      🎨 Generate AI Image

                    </button>

                  </div>

                )
              }
              {
                loading && currentStep === 7 && (

                  <div className="bg-white rounded-3xl shadow-xl p-10 mt-8 text-center">

                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto"></div>

                    <h2 className="text-2xl font-bold mt-6">

                      Generating Image...

                    </h2>

                    <p className="text-gray-500">

                      Stable Diffusion is creating your artwork.

                    </p>

                  </div>

                )
              }

              {/* GENERATED IMAGE */}
              {generatedImage && (

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <h2>Original Prompt Image</h2>

                    <img
                      src={`data:image/png;base64,${originalGeneratedImage}`}
                    />

                    <p>

                      CLIP Score

                      {originalClipScore}%

                    </p>

                  </div>

                  <div>

                    <h2>Enhanced Prompt Image</h2>

                    <img
                      src={`data:image/png;base64,${enhancedGeneratedImage}`}
                    />

                    <p>

                      CLIP Score

                      {enhancedClipScore}%

                    </p>

                  </div>

                </div>


              )}
              <div className="flex gap-4 mt-4 flex-wrap">
                    <button
                      onClick={handleClipScore}
                      className="bg-pink-500 text-white px-5 py-2 rounded-xl"
                    >
                      📊 CLIP Score
                    </button>
                  </div>

              {
                generatedImage && (

                  <div className="grid md:grid-cols-2 gap-6 mt-8">

                    <button

                      onClick={downloadImage}

                      className="

bg-green-600

text-white

py-4

rounded-2xl

font-bold

"

                    >

                      ⬇ Download Image

                    </button>

                    <button

                      onClick={handleClipScore}

                      className="

bg-indigo-600

text-white

py-4

rounded-2xl

font-bold

"

                    >

                      📊 CLIP Score

                    </button>

                  </div>

                )
              }
              {
                generatedImage && (

                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-xl p-8 mt-8 text-white text-center">

                    <h2 className="text-3xl font-bold">

                      🎉 Image Generated Successfully

                    </h2>

                    <p className="mt-3">

                      Your enhanced prompt has been converted into a high-quality AI-generated image.

                    </p>

                  </div>

                )
              }
              {
                originalClipScore > 0 &&
                enhancedClipScore > 0 && (

                  <div className="bg-white p-6 rounded-3xl shadow-lg mt-6">

                    <h3 className="text-2xl font-bold mb-5">

                      📊 Prompt Comparison

                    </h3>

                    <ClipComparisonChart

                      original={originalClipScore}

                      enhanced={enhancedClipScore}

                    />

                  </div>

                )}
              {
                originalClipScore > 0 &&
                enhancedClipScore > 0 && (

                  <div
                    className="bg-green-100 p-6 rounded-3xl mt-5"
                  >

                    <h3 className="text-xl font-bold">

                      🏆 Best Prompt

                    </h3>

                    <p className="mt-3">

                      {

                        enhancedClipScore > originalClipScore

                          ?

                          `Enhanced Prompt performed better by ${(
                            enhancedClipScore - originalClipScore
                          ).toFixed(2)}%`

                          :

                          `Original Prompt performed better`

                      }

                    </p>

                  </div>

                )}
                 {originalClipScore > 0 &&
                  enhancedClipScore > 0 && (

                <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

                  <div className="flex items-center gap-4 mb-8">

                    <div className="w-14 h-14 bg-green-100 rounded-full flex justify-center items-center text-3xl">

                      📊

                    </div>

                    <div>

                      <h2 className="text-3xl font-bold text-green-600">

                        Step 8

                      </h2>

                      <p className="text-gray-500">

                        CLIP Similarity Evaluation

                      </p>

                    </div>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-8">

                    <div

                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-8 rounded-full flex justify-center items-center text-white font-bold transition-all duration-1000"

                      style={{

                        width: `${similarityScore}%`

                      }}

                    >

                      {similarityScore}%

                    </div>

                  </div>

                </div>
              )}
                
              {
                originalClipScore > 0 &&
                enhancedClipScore > 0 && (

                  <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-3xl shadow-xl p-10 mt-8 text-center text-white">

                    <h2 className="text-5xl mb-4">

                      🎉

                    </h2>

                    <h1 className="text-4xl font-bold">

                      AI Pipeline Completed Successfully

                    </h1>

                    <p className="mt-4 text-xl">

                      Your image has been generated, evaluated and stored successfully.

                    </p>

                  </div>

                )
              }
              {
                originalClipScore > 0 &&
                enhancedClipScore > 0 && (

                  <div className="text-center mt-10">

                    <button

                      onClick={resetDashboard}

                      className="

bg-gradient-to-r

from-purple-600

to-indigo-700

text-white

px-12

py-4

rounded-2xl

text-xl

font-bold

hover:scale-105

transition

"

                    >

                      🔄 Generate Another Image

                    </button>

                  </div>

                )
              }

              {/* SIMILARITY SCORE */}
              {/* {similarityScore && (

                <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

                  <div className="flex items-center gap-4 mb-8">

                    <div className="w-14 h-14 bg-green-100 rounded-full flex justify-center items-center text-3xl">

                      📊

                    </div>

                    <div>

                      <h2 className="text-3xl font-bold text-green-600">

                        Step 8

                      </h2>

                      <p className="text-gray-500">

                        CLIP Similarity Evaluation

                      </p>

                    </div>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-8">

                    <div

                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-8 rounded-full flex justify-center items-center text-white font-bold transition-all duration-1000"

                      style={{

                        width: `${similarityScore}%`

                      }}

                    >

                      {similarityScore}%

                    </div>

                  </div>

                </div>
              )} */}
              
            </>
          )}

          {/* <div className="bg-white p-6 rounded-3xl shadow-lg">

  <h2 className="text-2xl font-bold mb-4">

    📜 My History

  </h2>

  {history.map((item) => (

    <div
      key={item._id}
      className="border-b py-4"
    >

      <p>
        <b>Caption:</b>
        {item.caption}
      </p>

      <p>
        <b>Prompt:</b>
        {item.prompt}
      </p>

      <p>
        <b>Score:</b>
        {item.clipScore}%
      </p>

    </div>

  ))}

</div> */}

        </div>

      </div>

    </div>
  );


}