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
    try {
      const result = await Item.findById(savedItem._id)?.populate(
        "created_by",
        "name"
      );
      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ message: JSON.stringify(err) });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = createItem;
