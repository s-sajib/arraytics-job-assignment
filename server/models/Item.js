const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
// Item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  // created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// itemSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Item", itemSchema);
