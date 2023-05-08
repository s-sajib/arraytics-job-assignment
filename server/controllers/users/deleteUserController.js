const User = require("../../models/User/User");

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(202).json({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: "User not found!" });
  }
}

module.exports = deleteUser;
