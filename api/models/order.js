const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
