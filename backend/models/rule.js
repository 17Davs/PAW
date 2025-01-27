const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ruleSchema = new Schema(
  {
    criteria: {
      type: String,
      unique: true,
      required: true,
    },
    points: {
      type: Number,
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Os pontos devem ser maiores que zero",
      },
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Rule = mongoose.model("Rule", ruleSchema);
module.exports = Rule;
