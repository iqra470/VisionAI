const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const fileUpload = require("express-fileupload");

const app = express();
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } })); // 🔥 important

const authRoutes = require("./routes/auth");
const generateRoutes = require("./routes/generate");
const historyRoutes = require("./routes/history");
const analyticsRoutes = require("./routes/analytics");

app.use(cors());
app.use(express.json({
  limit: "50mb"
}));

app.use(express.urlencoded({
  extended: true,
  limit: "50mb"
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use(

 "/api/admin",

 require("./routes/adminRoutes")

);
app.use("/api/generate", generateRoutes);
app.use("/api/history", historyRoutes);


app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// MongoDB connect

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  


// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});