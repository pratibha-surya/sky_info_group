import SubCategory from "../model/SubCategory.js";



export const createSubcategory = async (req, res) => {
  try {
    const subcategory = new SubCategory(req.body);
    const saved = await subcategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate('category');
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const updated = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subcategory deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
