const router = require("express").Router();
// const User = require("../models/User");
const Item = require("../models/Item");

//CREATE Item
router.post("/", async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Item
router.patch("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedItem);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ITEM
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    res.status(200).json("Item has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Items
router.get("/", async (req, res) => {
  try {
    const allItem = await Item.find();

    res.status(200).json(allItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
