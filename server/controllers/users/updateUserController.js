const User = require("../../models/User/User");

const userDataUpdateValidationSchema = require("../../models/User/userDataUpdateValidationSchema");

async function updateUser(req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    try {
      const newData = { ...user?._doc, ...req.body };
      userDataUpdateValidationSchema.validate(newData);
      const updatedData = await User.findByIdAndUpdate(
        id,
        {
          $set: { ...req.body },
        },
        { new: true }
      );
      res.status(202).json(updatedData);
    } catch (err) {
      console.log("user data is invalid");
      res.status(500).json({ message: JSON.stringify(err) });
    }
  } catch (err) {
    console.log("User not found!");
    res.status(400).send("User not found!");
  }
}

module.exports = updateUser;
