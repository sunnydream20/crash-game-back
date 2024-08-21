/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
   
      type: String,
      required: [true, "Username is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    countryCode: {
      type: String,
      // required: [true, "Country Code is required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required."],
    },
    referralId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
    },
    termsAndConditions: {
      type: Boolean,
      required: [true, "Please Accept Our Terms And Conditions."],
    },
    investmentLevel: {
      type: String,
      required: false,
      default: "A",
    },
    investmentSubLevel: {
      type: String,
      required: false,
      default: "A1",
    },
    kyc: { type: kycSchema },
    profitBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    referralCreditBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    depositBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    rewardBalance: {
      type: Number,
      required: false,
      min: 0,
      default: 0,
    },
    isActive: { type: Boolean, default: true },
    alertNotifications: { type: Boolean, default: false },
    emailNotifications: { type: Boolean, default: false },
    role: { type: String, default: "user" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isDeleted: { type: Number, default: 0 },
    isDeletedAt: { type: Date },
    avatarBg: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
