const mongoose = require("mongoose");

// const imageHistorySchema = new mongoose.Schema({

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },

//   originalImage: String,

//   caption: String,

//   prompt: String,

//   generatedImage: String,

//   clipScore: Number,

//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
// });
const imageHistorySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  caption: String,

  originalPrompt: String,

  refinedPrompt: String,

  selectedEnhancements: [String],

  originalScore: Number,

  refinedScore: Number,

  winnerPrompt: String,

  clipScore: Number,

  originalImage: String

},{
  timestamps:true
});

module.exports = mongoose.model(
  "ImageHistory",
  imageHistorySchema
);