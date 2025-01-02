const mongoose = require('mongoose');
// const AutoIncrement = require("mongoose-sequence")(mongoose); // Import mongoose-sequence

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    id: {
      type: String,
      unique: true 
    },
    category_id: {
      type: String,
      unique: true 
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Apply the auto-increment plugin to the category_id field
// categorySchema.plugin(AutoIncrement, { inc_field: "category_id" });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
