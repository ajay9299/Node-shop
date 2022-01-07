const router = require("express").Router();

const { Products } = require("../controller/index");
const { checkAuth, roleAuth } = require("../middleware/auth");

// Create products
router.post(
  "/",
  checkAuth,
  roleAuth(["admin", "shoper"]),
  Products.postProducts
);
// Get all products
router.get(
  "/",
  checkAuth,
  roleAuth(["admin", "basic", "shoper"]),
  Products.getProducts
);
// Get product by id
router.get(
  "/:productId",
  checkAuth,
  roleAuth(["admin", "basic", "shoper"]),
  Products.getProductById
);
// Update product
router.patch(
  "/:productId",
  checkAuth,
  roleAuth(["admin", "shoper"]),
  Products.upDateProduct
);
// Delete product
router.delete(
  "/:productId",
  checkAuth,
  roleAuth(["admin", "shoper"]),
  Products.deleteProduct
);

module.exports = router;
