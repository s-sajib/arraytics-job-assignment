const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// User schema
const userSchema = new mongoose.Schema({
  id: { type: Number, default: 1 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: Number, default: null, required: false },
});

userSchema.plugin(AutoIncrement, { inc_field: "id" });
module.exports = mongoose.model("User", userSchema);
