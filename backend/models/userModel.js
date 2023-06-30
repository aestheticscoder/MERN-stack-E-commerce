const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: [true, "Please Enter your Name"],
    minLength: [2, "Name can't be less than 2 characters"],
    maxLength: [40, "Name can't exceed characters more than 40"],
    trim: true,
  },
  email: {
    type: String,
    requried: [true, "Please Enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a Valid Email"],
  },
  password: {
    type: String,
    requried: [true, "Please Enter your Password"],
    minLength: [8, "Password can't be less than 8 characters"],
    maxLength: [15, "Password can't exceed characters more than 15"],
    select: false, // field should not be selected or returned by default while accessing MongoDB Compass for retrieval of data
  },
  avatar: {
    public_id: {
      // We'll use cloudnary to host our images cuz we get PublicId and URL of that particular Image
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User", userSchema);
