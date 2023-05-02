const mongoose = require("mongoose")

const searchSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    city: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const SearchModel = mongoose.model("Search", searchSchema);

module.exports = {
    SearchModel
}
