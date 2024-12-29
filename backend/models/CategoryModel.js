const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const categorySchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// categorySchema.plugin(AutoIncrement, { inc_field: "id" });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
