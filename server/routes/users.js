// Import required packages
const router = require("express").Router();
const User = require("../models/User/User");
//Load environment Variables
require("dotenv");

//import controllers

const updateUserController = require("../controllers/users/updateUserController");
const deleteUserController = require("../controllers/users/deleteUserController");

//import middlewares
const verifyToken = require("../middlewares/verifier");

//get all user
router.get("/", verifyToken, async (req, res) => {
  const users = await User.find()?.populate("created_by", "name");
  res.set("User-Count", users?.length ?? 0);
  res.send(users);
});

//get user
router.get("/:id", verifyToken, async (req, res) => {
  const user = await User.findById(req.params.id)?.populate(
    "created_by",
    "name"
  );
  if (!user) {
    return res.status(404).send("User not found!");
  }
  res.send(user);
});

//update user
router.patch("/:id", verifyToken, async (req, res) => {
  await updateUserController(req, res);
});

//update user
router.delete("/:id", verifyToken, async (req, res) => {
  await deleteUserController(req, res);
});

module.exports = router;
