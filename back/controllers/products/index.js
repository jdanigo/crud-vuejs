import mongoose from "mongoose";
import { productsModel } from "../../models/products";

const productsController = {};

productsController.getAction = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await productsModel.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    return res.status(200).json({ data: product });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

productsController.getAllAction = async (req, res) => {
  try {
    let products = await productsModel.find();
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

productsController.createAction = async (req, res) => {
  const newProduct = await productsModel.create(req.body);
  newProduct.toObject();
  return res.status(201).json({ data: newProduct, message: 'Product Created Successfully' });
};

productsController.updateAction = async (req, res) => {
  const { id } = req.params;
  try {
    let product = await productsModel.findById(id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    Object.assign(product, req.body);
    await product.save();
    return res.json({data: product, message: 'Updated Successfully'});
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

productsController.deleteAction = async (req, res) => {
    const {id} = req.params;
  try {
    let product = await productsModel.findByIdAndRemove(id);
    if (!product) {
      return res
        .status(400)
        .json({ message: "Product not found" });
    }
    return res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

export default productsController;
