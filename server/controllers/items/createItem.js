const Item = require("../../models/Item/Item");
const itemValidationSchema = require("../../models/Item/itemValidationSchema");

async function createItem(req, res) {
  const { name } = req.body;
  const userId = req.user._id;
  const newItem = new Item({
    name: name,
    created_by: userId,
  });

  try {
    const databaseValidationError = newItem.validateSync();

    if (databaseValidationError) {
      return res.status(500).json(databaseValidationError);
    }

    itemValidationSchema.validate(newItem);
    const savedItem = await newItem.save();
    return res.status(200).json(savedItem);
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = createItem;
