const router = require("express").Router();
// const User = require("../models/User");
const Item = require("../models/Item/Item");

//middleware for authentication
const verifyToken = require("../middlewares/verifier");
const createItemController = require("../controllers/items/createItem");

//CREATE Item
router.post("/", verifyToken, async (req, res) => {
  const response = await createItemController(req, res);
  return response;
});

// TODO: Update the controllers in seperate file

//UPDATE Item
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    try {
      const updatedData = { ...item, ...req.body };

      const validationError = new Item(updatedData).validateSync();

      if (validationError) {
        return res.status(500).json(validationError);
      }

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
    res.status(400).send("Item not found!");
  }
});

//DELETE ITEM
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json("Item has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Item
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Items
router.get("/", verifyToken, async (req, res) => {
  try {
    const allItem = await Item.find().populate("created_by", "name");
    console.log(allItem.length);
    res.set("Total-Object", allItem?.length ?? 0);
    res.status(200).json(allItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
