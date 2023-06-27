const Product = require("../models/productModel");

// Create Products (Admin)
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: true,
    product: product,
  });
};

// Get all Products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ status: true, products: products });
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ status: false, message: "Product not found" });
      }
      res.status(200).json({ status: true, product: product });
    } catch (error) {
      res.status(500).json({ status: false, message: "Failed to fetch product" });
    }
  };
  
// Update Product (Admin)
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(500)
      .json({ status: false, message: "Product Not Found" });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({status: true, product : product})
};


// Delete Product (Admin)

exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return res.status(500).json({status: false , message: "Product Not Found"})
    }
    await product.deleteOne();
    res.status(200).json({status: true, message: "Product Deleted Successfully"});
} 
