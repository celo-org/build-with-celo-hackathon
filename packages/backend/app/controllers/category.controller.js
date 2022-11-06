const db = require('../models');

const Category = db.categories;

module.exports = {
  create: async (req, res) => {
    const { name, icon, parent } = req.body;
    try {
      const newCategory = await Category.create({
        name,
        icon,
        parent,
      });

      if (newCategory.parent) {
        console.log(newCategory.parent);
        await Category.updateOne(
          { _id: newCategory.parent },
          { $push: { children: newCategory.id } }
        );
      }

      if (!newCategory) {
        return res.status(400).json({ success: false });
      }
      return res.status(200).json({ success: true, data: newCategory });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find({ parent: undefined }).populate({
        // populate the depth as much as you want
        // https://stackoverflow.com/a/47038544
        path: 'children',
        model: Category,
        populate: { path: 'children', model: Category },
      });
      return res.status(200).json({ data: categories });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error:
          error.message || 'Some errors occurred while retrieving categories.',
      });
    }
  },
  getOneCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id).populate({
        // populate the depth as much as you want
        // https://stackoverflow.com/a/47038544
        path: 'children',
        model: Category,
        populate: { path: 'children', model: Category },
      });
      if (!category) {
        return res.status(400).json({ success: false });
      }
      return res.status(200).json({ success: true, data: category });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  },
};
