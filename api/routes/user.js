const router = require("express").Router();
const { Users } = require("../controller/index");

const {checkAuth} = require("../middleware/auth");


router.post("/signup", Users.postUser);
router.post("/login", Users.loginUser);
router.delete("/:userId",checkAuth, Users.deleteUser);

module.exports = router;
