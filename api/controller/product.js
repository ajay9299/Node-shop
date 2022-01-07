const mongoose = require("mongoose");
const Product = require("../models/product");
const { statusCodes, Messages } = require("../constant/index");

// <--------------------------------------------------CRUD OPERATIONS-------------------------------------------------->

exports.postProducts = async (req, res, next) => {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
    });

    await Product.create(product);

    res.status(statusCodes.OK).json({
      message:Messages.PRODUCT,
      createdProduct: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find().select("name price _id");

    const response = {
      count: allProducts.length,
      products: allProducts.map((doc) => {
        return {
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          request: {
            type: "GET",
            url: "localhost:3000/api/products/" + doc._id,
          },
        };
      }),
    };

    res.status(statusCodes.OK).json({
      message:Messages.ALL_PRO,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const data = await Product.findById(id);

    res.status(statusCodes.OK).json({
      message:Messages.YOUR_PRO,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.upDateProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;

    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }

    const product = await Product.updateOne({ _id: id }, { $set: updateOps });

    res.status(statusCodes.OK).json({
      message:Messages.UP_DATE_PRO,
      Info: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const delPro = await Product.deleteOne({ _id: id });

    if(delPro.deletedCount===0){
      return res.status(statusCodes.BAD_REQUEST).json({
        message:Messages.INVALID_PRO
      })
    }
    res.status(statusCodes.OK).json({
      message:Messages.DELETE_PRO,
      id: id,
    });
  } catch (error) {
    next(error);
  }
};
