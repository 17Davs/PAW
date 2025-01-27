var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const entitySchema = new Schema(
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
    description: {
      type: String,
      required: [true, "Description is required!"],
      minLength: 10,
      maxLength: 100,
    },
    image: {
      type: String,
      // required: [true, "Profile image is required!"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/* Hash password */
entitySchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.pass = await bcrypt.hash(this.pass, salt);
  next();
});

/* Exclude fields from JSON output */
entitySchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.pass;
    delete ret.image;
    return ret;
  },
});

module.exports = mongoose.model("Entity", entitySchema);
