const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: { type: Array, required: true },
    procedure: { type: String, required: true },
    time: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);