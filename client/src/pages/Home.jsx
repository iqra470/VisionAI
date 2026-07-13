import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">

      {/* 🔷 HERO */}
      <div className="py-20 px-6 bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-500 text-white text-center">
        <h1 className="text-5xl font-bold mb-6">
          Vision-Guided Prompt Optimization
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Upload an image and generate an optimized AI prompt to recreate a better version.
        </p>

        <Link to="/dashboard">
          <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-lg">
            Generate Image
          </button>
        </Link>
      </div>
  {/* 🔷 HOW IT WORKS (SIDE BY SIDE CARDS) */}
      <div className="py-16 px-6 text-center bg-gray-50">
  <h2 className="text-3xl font-bold mb-10 text-gray-800">
    How It Works
  </h2>

  <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 border-t-4 border-purple-500">
      <h3 className="text-xl font-semibold mb-2 text-purple-600">📤 Upload</h3>
      <p className="text-gray-600">Upload your image to start the process</p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 border-t-4 border-blue-500">
      <h3 className="text-xl font-semibold mb-2 text-blue-600">🧠 Analyze</h3>
      <p className="text-gray-600">AI analyzes image using BLIP model</p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 border-t-4 border-pink-500">
      <h3 className="text-xl font-semibold mb-2 text-pink-600">✨ Optimize</h3>
      <p className="text-gray-600">Generate high-quality prompt automatically</p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 border-t-4 border-green-500">
      <h3 className="text-xl font-semibold mb-2 text-green-600">🎨 Generate</h3>
      <p className="text-gray-600">Create improved image using AI</p>
    </div>

  </div>
</div>

    {/* 🔷 IMAGE + TEXT SECTION 1 */}
<div className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

  {/* LEFT IMAGE */}
  <div className="bg-purple-100 p-6 rounded-2xl shadow-lg">
    <img
      src="src/assets/s2.webp"
      alt="preview"
      className="rounded-xl w-full"
    />
  </div>

  {/* RIGHT TEXT */}
  <div>
    <h2 className="text-3xl font-bold mb-4">Image to Prompt</h2>
    <p className="text-gray-600 mb-6">
      Transform your image into a detailed AI prompt. Enhance creativity and generate high-quality outputs.
    </p>

    <Link to="/dashboard">
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
        Generate Prompt
      </button>
    </Link>
  </div>

</div>


{/* 🔷 IMAGE + TEXT SECTION 2 (REVERSED) */}
<div className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

  {/* LEFT TEXT */}
  <div>
    <h2 className="text-3xl font-bold mb-4">Enhance Your Image</h2>
    <p className="text-gray-600 mb-6">
      Improve your images using AI-powered prompt optimization and generate better visual outputs.
    </p>

    <Link to="/dashboard">
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
        Try Now
      </button>
    </Link>
  </div>

  {/* RIGHT IMAGE */}
  <div className="bg-purple-100 p-6 rounded-2xl shadow-lg">
    <img
      src="src/assets/s1.webp"
      alt="preview"
      className="rounded-xl w-full"
    />
  </div>

</div>
   
   {/* 🔷 IMAGE + TEXT SECTION 3 */}
<div className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

  {/* LEFT IMAGE */}
  <div className="bg-blue-100 p-6 rounded-2xl shadow-lg">
    <img
      src="src/assets/s3.png"
      alt="preview"
      className="rounded-xl w-full"
    />
  </div>

  {/* RIGHT TEXT */}
  <div>
    <h2 className="text-3xl font-bold mb-4">Smart Prompt Enhancement</h2>
    <p className="text-gray-600 mb-6">
      Our AI refines your prompts using advanced models to ensure better quality,
      more detail, and improved image generation results.
    </p>

    <Link to="/dashboard">
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        Explore Now
      </button>
    </Link>
  </div>

</div>
   

      {/* 🔷 MODELS */}
      {/* 🔷 MODELS SECTION */}
<div className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center text-white">

  <h2 className="text-4xl font-bold mb-12">
    Models Used
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

    {/* BLIP */}
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/20 transition duration-300 border border-white/10">
      <h3 className="text-xl font-semibold mb-3 text-purple-400">🧠 BLIP</h3>
      <p className="text-gray-300">
        Image captioning model for understanding visuals
      </p>
    </div>

    {/* Stable Diffusion */}
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/20 transition duration-300 border border-white/10">
      <h3 className="text-xl font-semibold mb-3 text-blue-400">🎨 Stable Diffusion</h3>
      <p className="text-gray-300">
        Generates high-quality images from prompts
      </p>
    </div>

    {/* CLIP */}
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 hover:bg-white/20 transition duration-300 border border-white/10">
      <h3 className="text-xl font-semibold mb-3 text-pink-400">📊 CLIP</h3>
      <p className="text-gray-300">
        Evaluates similarity between image and prompt
      </p>
    </div>

  </div>
</div>

      {/* 🔷 INSPIRATION GALLERY */}
<div className="py-16 px-6 bg-gray-50 text-center">

  <h2 className="text-4xl font-bold mb-3">
    Inspiration from Image Prompt
  </h2>

  <p className="text-gray-600 mb-10">
    Explore a world of visual inspiration with AI-generated styles
  </p>

  {/* GRID */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">

    {[
      { title: "3D Animation", img: "/assets/img1.jpg" },
      { title: "Bauhaus", img: "/assets/img2.jpg" },
      { title: "Doodle Art", img: "/assets/img3.jpg" },
      { title: "View from Behind", img: "/assets/img4.jpg" },
      { title: "Anime", img: "/assets/img5.jpg" },
      { title: "Constructivism", img: "/assets/img6.jpg" },
      { title: "Sketch Drawing", img: "/assets/img7.jpg" },
      { title: "Three-Sided View", img: "/assets/img8.jpg" },
      { title: "Watercolor", img: "/assets/img9.jpg" },
      { title: "Victorian", img: "/assets/img10.jpg" },
    ].map((item, i) => (
      
      <div
        key={i}
        className="relative group rounded-xl overflow-hidden shadow-md"
      >
        {/* IMAGE */}
        <img
          src={item.img}
          alt=""
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
        />

        {/* TAG */}
        <span className="absolute top-2 left-2 bg-white/90 text-sm px-2 py-1 rounded-md font-medium shadow">
          {item.title}
        </span>

        {/* HOVER OVERLAY */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-lg text-sm">
            Try Style
          </button>
        </div>

      </div>
    ))}

  </div>
</div>

      {/* 🔷 CTA */}
      <div className="text-center py-12">
        <h2 className="text-2xl mb-4">Ready to transform your images?</h2>

        <Link to="/dashboard">
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition">
            Start Now 🚀
          </button>
        </Link>
      </div>

    </div>
  );
}