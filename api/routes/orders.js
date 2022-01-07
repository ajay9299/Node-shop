const router = require("express").Router();
const { Orders } = require("../controller/index");

const { checkAuth, roleAuth } = require("../middleware/auth");

// Create order
router.get("/", checkAuth, roleAuth(["admin", "basic"]), Orders.getOrders);
// Get all orders
router.post("/", checkAuth, roleAuth(["admin", "basic"]), Orders.postOrder);
// Get order by id
router.get(
  "/:orderId",
  checkAuth,
  roleAuth(["admin", "basic"]),
  Orders.getOrderById
);
// Delete order
router.delete(
  "/:orderId",
  checkAuth,
  roleAuth(["admin", "basic"]),
  Orders.deleteOrder
);

module.exports = router;
