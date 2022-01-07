const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const { statusCodes, Messages } = require("../constant/index");
// <--------------------------------------------------CRUD OPERATIONS-------------------------------------------------->

exports.postOrder = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId);

    if (!product) {
      res.status(statusCodes.NOT_FOUND).json({
        message: Messages.INVALID_PRO,
      });
    }

    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      productId: req.body.productId,
      quantity: req.body.quantity,
    });

    const finalOrder = await Order.create(order);

    res.status(statusCodes.OK).json({
      message: Messages.ORDER,
      order: order,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().select("productId quantity _id");
    const response = {
      count: orders.length,
      data: orders.map((doc) => {
        return {
          _id: doc._id,
          productId: doc.productId,
          quantity: doc.quantity,
          request: {
            type: "GET",
            url: "localhost:3000/api/orders/" + doc._id,
          },
        };
      }),
    };
    res.status(statusCodes.OK).json({
      message: Messages.ALL_ORD,
      orders: response,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const id = req.params.orderId;
    const data = await Order.findById(id);

    res.status(statusCodes.OK).json({
      message: Messages.YOUR_ORD,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const delItem = await Order.deleteOne({ _id: req.params.orderId });

    if (delItem.deletedCount===0) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message:Messages.ORDER_NO
      })
    }
    res.status(statusCodes.OK).json({
      message: Messages.CANCEL_ORD,
    });
  } catch (error) {
    next(error);
  }
};
