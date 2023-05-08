const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is Required!"] },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email already exists!"],
  },
  password: { type: String, required: [true, "Password is Required!"] },
  created_at: { type: Date, default: Date.now },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

userSchema.pre("save", function (next) {
  if (this.isNew && !this.created_by) {
    this.created_by = this._id;
  }
  next();
});

// userSchema.plugin(AutoIncrement, { inc_field: "id" });
module.exports = mongoose.model("User", userSchema);
