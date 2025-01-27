const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const donatorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email."],
    },
    pass: {
      type: String,
      required: [true, "Password is required!"],
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* Hash password */
donatorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.pass = await bcrypt.hash(this.pass, salt);
  next();
});

/* Exclude fields from JSON output */
donatorSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.pass;
    return ret;
  },
});

const Donator = mongoose.model("donator", donatorSchema);
module.exports = Donator;
