/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./api/constant/index.js":
/*!*******************************!*\
  !*** ./api/constant/index.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\n  statusCodes: __webpack_require__(/*! ./statusCode */ \"./api/constant/statusCode.js\"),\n  Messages: __webpack_require__(/*! ./messages */ \"./api/constant/messages.js\"),\n};\n\n\n//# sourceURL=webpack://node-rest-api/./api/constant/index.js?");

/***/ }),

/***/ "./api/constant/messages.js":
/*!**********************************!*\
  !*** ./api/constant/messages.js ***!
  \**********************************/
/***/ ((module) => {

eval("module.exports = {\n    USER_NOT:'User not found',\n    INVALID_PRO:'Invalid product',\n    ORDER:'Order Done',\n    ALL_ORD:'All orders',\n    YOUR_ORD:'Your order',\n    CANCEL_ORD:'Order cancel',\n    PRODUCT:'Product added',\n    ALL_PRO:'All products',\n    YOUR_PRO:'Product',\n    UP_DATE_PRO:'Product updated',\n    DELETE_PRO:'Product deleted',\n    EMAIL_EXS:'User allready exists',\n    SUCC_SIGN_UP:'User signUp successfully',\n    USER_IN_VAL:'User invalid',\n    LOGIN_SUCC:'Login successfully',\n    ACCOUNT_DEL:'Account deleted',\n    INVALID_TOK:'Invalid token',\n    ORDER_NO:'Invalid order'\n};\n\n\n//# sourceURL=webpack://node-rest-api/./api/constant/messages.js?");

/***/ }),

/***/ "./api/constant/statusCode.js":
/*!************************************!*\
  !*** ./api/constant/statusCode.js ***!
  \************************************/
/***/ ((module) => {

eval("module.exports = {\n  OK: 200,\n  CREATED: 201,\n  BAD_REQUEST: 400,\n  UNAUTHORIZED: 401,\n  NOT_FOUND: 404,\n};\n\n\n//# sourceURL=webpack://node-rest-api/./api/constant/statusCode.js?");

/***/ }),

/***/ "./api/controller/index.js":
/*!*********************************!*\
  !*** ./api/controller/index.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\n    Products:__webpack_require__(/*! ./product */ \"./api/controller/product.js\"),\n    Orders:__webpack_require__(/*! ./order */ \"./api/controller/order.js\"),\n    Users:__webpack_require__(/*! ./user */ \"./api/controller/user.js\")\n}\n\n//# sourceURL=webpack://node-rest-api/./api/controller/index.js?");

/***/ }),

/***/ "./api/controller/order.js":
/*!*********************************!*\
  !*** ./api/controller/order.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Order = __webpack_require__(/*! ../models/order */ \"./api/models/order.js\");\nconst Product = __webpack_require__(/*! ../models/product */ \"./api/models/product.js\");\nconst { statusCodes, Messages } = __webpack_require__(/*! ../constant/index */ \"./api/constant/index.js\");\n// <--------------------------------------------------CRUD OPERATIONS-------------------------------------------------->\n\nexports.postOrder = async (req, res, next) => {\n  try {\n    const product = await Product.findById(req.body.productId);\n\n    if (!product) {\n      res.status(statusCodes.NOT_FOUND).json({\n        message: Messages.INVALID_PRO,\n      });\n    }\n\n    const order = new Order({\n      _id: mongoose.Types.ObjectId(),\n      productId: req.body.productId,\n      quantity: req.body.quantity,\n    });\n\n    const finalOrder = await Order.create(order);\n\n    res.status(statusCodes.OK).json({\n      message: Messages.ORDER,\n      order: order,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexports.getOrders = async (req, res, next) => {\n  try {\n    const orders = await Order.find().select(\"productId quantity _id\");\n    const response = {\n      count: orders.length,\n      data: orders.map((doc) => {\n        return {\n          _id: doc._id,\n          productId: doc.productId,\n          quantity: doc.quantity,\n          request: {\n            type: \"GET\",\n            url: \"localhost:3000/api/orders/\" + doc._id,\n          },\n        };\n      }),\n    };\n    res.status(statusCodes.OK).json({\n      message: Messages.ALL_ORD,\n      orders: response,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexports.getOrderById = async (req, res, next) => {\n  try {\n    const id = req.params.orderId;\n    const data = await Order.findById(id);\n\n    res.status(statusCodes.OK).json({\n      message: Messages.YOUR_ORD,\n      data: data,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexports.deleteOrder = async (req, res, next) => {\n  try {\n    const delItem = await Order.deleteOne({ _id: req.params.orderId });\n\n    if (delItem.deletedCount===0) {\n      return res.status(statusCodes.BAD_REQUEST).json({\n        message:Messages.ORDER_NO\n      })\n    }\n    res.status(statusCodes.OK).json({\n      message: Messages.CANCEL_ORD,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\n\n//# sourceURL=webpack://node-rest-api/./api/controller/order.js?");

/***/ }),

/***/ "./api/controller/product.js":
/*!***********************************!*\
  !*** ./api/controller/product.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst Product = __webpack_require__(/*! ../models/product */ \"./api/models/product.js\");\nconst { statusCodes, Messages } = __webpack_require__(/*! ../constant/index */ \"./api/constant/index.js\");\n\n// <--------------------------------------------------CRUD OPERATIONS-------------------------------------------------->\n\nexports.postProducts = async (req, res, next) => {\n  try {\n    const product = new Product({\n      _id: new mongoose.Types.ObjectId(),\n      name: req.body.name,\n      price: req.body.price,\n    });\n\n    await Product.create(product);\n\n    res.status(statusCodes.OK).json({\n      message:Messages.PRODUCT,\n      createdProduct: product,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexports.getProducts = async (req, res, next) => {\n  try {\n    const allProducts = await Product.find().select(\"name price _id\");\n\n    const response = {\n      count: allProducts.length,\n      products: allProducts.map((doc) => {\n        return {\n          name: doc.name,\n          price: doc.price,\n          _id: doc._id,\n          request: {\n            type: \"GET\",\n            url: \"localhost:3000/api/products/\" + doc._id,\n          },\n        };\n      }),\n    };\n\n    res.status(statusCodes.OK).json({\n      message:Messages.ALL_PRO,\n      data: response,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexports.getProductById = async (req, res, next) => {\n  try {\n    const id = req.params.productId;\n    const data = await Product.findById(id);\n\n    res.status(statusCodes.OK).json({\n      message:Messages.YOUR_PRO,\n      data: data,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexports.upDateProduct = async (req, res, next) => {\n  try {\n    const id = req.params.productId;\n\n    const updateOps = {};\n    for (const ops of req.body) {\n      updateOps[ops.propName] = ops.value;\n    }\n\n    const product = await Product.updateOne({ _id: id }, { $set: updateOps });\n\n    res.status(statusCodes.OK).json({\n      message:Messages.UP_DATE_PRO,\n      Info: product,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexports.deleteProduct = async (req, res, next) => {\n  try {\n    const id = req.params.productId;\n    const delPro = await Product.deleteOne({ _id: id });\n\n    if(delPro.deletedCount===0){\n      return res.status(statusCodes.BAD_REQUEST).json({\n        message:Messages.INVALID_PRO\n      })\n    }\n    res.status(statusCodes.OK).json({\n      message:Messages.DELETE_PRO,\n      id: id,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\n\n//# sourceURL=webpack://node-rest-api/./api/controller/product.js?");

/***/ }),

/***/ "./api/controller/user.js":
/*!********************************!*\
  !*** ./api/controller/user.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nconst jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\nconst User = __webpack_require__(/*! ../models/user */ \"./api/models/user.js\");\nconst { statusCodes, Messages } = __webpack_require__(/*! ../constant/index */ \"./api/constant/index.js\");\n\nexports.postUser = async (req, res, next) => {\n  try {\n    const data = await User.find({ email: req.body.email });\n\n    if (data.length >= 1) {\n      return res.status(statusCodes.BAD_REQUEST).json({\n        message: Messages.EMAIL_EXS,\n      });\n    }\n\n    const hashPass = await bcrypt.hash(req.body.password, 10);\n    const user = new User({\n      _id: mongoose.Types.ObjectId(),\n      fName: req.body.fName,\n      lName: req.body.lName,\n      role: req.body.role,\n      phone: req.body.phone,\n      email: req.body.email,\n      password: hashPass,\n    });\n\n    await User.create(user);\n    res.status(statusCodes.OK).json({\n      message: Messages.SUCC_SIGN_UP,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\n\nexports.loginUser = async (req, res, next) => {\n  try {\n    \n    const user = await User.find({ email: req.body.email });\n\n    if (user.length === 0) {\n      return res.status(statusCodes.BAD_REQUEST).json({\n        message: Messages.USER_IN_VAL,\n      });\n    }\n\n    const check = await bcrypt.compare(req.body.password, user[0].password);\n\n    if (!check) {\n      return res.status(statusCodes.BAD_REQUEST).json({\n        message: Messages.USER_IN_VAL,\n      });\n    }\n\n    const token = jwt.sign(\n      {\n        email: user[0].email,\n        userId: user[0]._id,\n      },\n      process.env.JWT_KEY,\n      { expiresIn: \"1h\" }\n    );\n\n    res.status(statusCodes.OK).json({\n      message: Messages.LOGIN_SUCC,\n      token: token,\n    });\n  } catch (error) {\n    next(error);\n  }\n};\nexports.deleteUser = async (req, res, next) => {\n  await User.remove({ _id: req.params.id });\n  res.status(statusCodes.OK).json({\n    message: Messages.ACCOUNT_DEL,\n  });\n};\n\n\n//# sourceURL=webpack://node-rest-api/./api/controller/user.js?");

/***/ }),

/***/ "./api/middleware/auth.js":
/*!********************************!*\
  !*** ./api/middleware/auth.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst User = __webpack_require__(/*! ../models/user */ \"./api/models/user.js\");\n\nconst {statusCodes, Messages} = __webpack_require__(/*! ../constant/index */ \"./api/constant/index.js\");\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\n\nconst checkAuth = async (req, res, next) => {\n  try {\n    const token = req.header('authToken');\n    \n    if (!token) {\n      return res.status(statusCodes.BAD_REQUEST).json({\n        message:Messages.INVALID_TOK,\n      });\n    }\n    const decoded = await jwt.verify(token, process.env.JWT_KEY);\n    const user = await User.findById({ _id: decoded.userId });\n\n    if (!user) {  \n      return res.status(statusCodes.BAD_REQUEST).json({\n        message:Messages.USER_IN_VAL\n      })\n    }\n    req.user = user;\n    next();\n  } catch (error) {\n    next(error);\n  }\n};\n\n\nconst roleAuth = (roles)=>{\n  return (req,res,next)=>{\n    if(roles.includes(req.user.role)){\n      next();\n    }else{\n      return res.status(statusCodes.BAD_REQUEST).json({\n        message:Messages.USER_IN_VAL\n      })\n    }\n  }\n}\n\n\nmodule.exports = {\n  checkAuth,\n  roleAuth\n};\n\n\n//# sourceURL=webpack://node-rest-api/./api/middleware/auth.js?");

/***/ }),

/***/ "./api/models/order.js":
/*!*****************************!*\
  !*** ./api/models/order.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst orderSchema = mongoose.Schema(\n  {\n    _id: mongoose.Schema.Types.ObjectId,\n    productId: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: \"Product\",\n      required: true,\n    },\n    user: {\n      type: mongoose.Schema.Types.ObjectId,\n      ref: \"User\",\n    },\n    quantity: { type: Number, default: 1 },\n  },\n  { timestamps: true }\n);\n\nmodule.exports = mongoose.model(\"Order\", orderSchema);\n\n\n//# sourceURL=webpack://node-rest-api/./api/models/order.js?");

/***/ }),

/***/ "./api/models/product.js":
/*!*******************************!*\
  !*** ./api/models/product.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst productSchema = mongoose.Schema(\n  {\n    _id: mongoose.Schema.Types.ObjectId,\n    name: {\n      type: String,\n      required: true,\n    },\n    price: {\n      type: Number,\n      required: true,\n    },\n    description: {\n      type: String,\n    },\n  },\n  { timestamps: true }\n);\n\nmodule.exports = mongoose.model(\"Product\", productSchema);\n\n\n//# sourceURL=webpack://node-rest-api/./api/models/product.js?");

/***/ }),

/***/ "./api/models/user.js":
/*!****************************!*\
  !*** ./api/models/user.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst userSchema = mongoose.Schema(\n  {\n    _id: mongoose.Schema.Types.ObjectId,\n    fName: {\n      type: String,\n      required: true,\n    },\n    lName: {\n      type: String,\n      required: true,\n    },\n    phone: {\n      type: Number,\n    },\n    role: {\n      type: String,\n      required: true,\n      default:'basic',\n      enum: [\"shoper\", \"basic\", \"admin\"],\n    },\n    email: {\n      type: String,\n      required: true,\n      unique: true,\n      match:\n        /^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/,\n    },\n    password: {\n      type: String,\n      required: true,\n      match: /^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,\n    },\n  },\n  { timestamps: true }\n);\n\nmodule.exports = mongoose.model(\"User\", userSchema);\n\n\n//# sourceURL=webpack://node-rest-api/./api/models/user.js?");

/***/ }),

/***/ "./api/routes/orders.js":
/*!******************************!*\
  !*** ./api/routes/orders.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const router = (__webpack_require__(/*! express */ \"express\").Router)();\nconst { Orders } = __webpack_require__(/*! ../controller/index */ \"./api/controller/index.js\");\n\nconst { checkAuth, roleAuth } = __webpack_require__(/*! ../middleware/auth */ \"./api/middleware/auth.js\");\n\n// Create order\nrouter.get(\"/\", checkAuth, roleAuth([\"admin\", \"basic\"]), Orders.getOrders);\n// Get all orders\nrouter.post(\"/\", checkAuth, roleAuth([\"admin\", \"basic\"]), Orders.postOrder);\n// Get order by id\nrouter.get(\n  \"/:orderId\",\n  checkAuth,\n  roleAuth([\"admin\", \"basic\"]),\n  Orders.getOrderById\n);\n// Delete order\nrouter.delete(\n  \"/:orderId\",\n  checkAuth,\n  roleAuth([\"admin\", \"basic\"]),\n  Orders.deleteOrder\n);\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack://node-rest-api/./api/routes/orders.js?");

/***/ }),

/***/ "./api/routes/products.js":
/*!********************************!*\
  !*** ./api/routes/products.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const router = (__webpack_require__(/*! express */ \"express\").Router)();\n\nconst { Products } = __webpack_require__(/*! ../controller/index */ \"./api/controller/index.js\");\nconst { checkAuth, roleAuth } = __webpack_require__(/*! ../middleware/auth */ \"./api/middleware/auth.js\");\n\n// Create products\nrouter.post(\n  \"/\",\n  checkAuth,\n  roleAuth([\"admin\", \"shoper\"]),\n  Products.postProducts\n);\n// Get all products\nrouter.get(\n  \"/\",\n  checkAuth,\n  roleAuth([\"admin\", \"basic\", \"shoper\"]),\n  Products.getProducts\n);\n// Get product by id\nrouter.get(\n  \"/:productId\",\n  checkAuth,\n  roleAuth([\"admin\", \"basic\", \"shoper\"]),\n  Products.getProductById\n);\n// Update product\nrouter.patch(\n  \"/:productId\",\n  checkAuth,\n  roleAuth([\"admin\", \"shoper\"]),\n  Products.upDateProduct\n);\n// Delete product\nrouter.delete(\n  \"/:productId\",\n  checkAuth,\n  roleAuth([\"admin\", \"shoper\"]),\n  Products.deleteProduct\n);\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack://node-rest-api/./api/routes/products.js?");

/***/ }),

/***/ "./api/routes/user.js":
/*!****************************!*\
  !*** ./api/routes/user.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const router = (__webpack_require__(/*! express */ \"express\").Router)();\nconst { Users } = __webpack_require__(/*! ../controller/index */ \"./api/controller/index.js\");\n\nconst {checkAuth} = __webpack_require__(/*! ../middleware/auth */ \"./api/middleware/auth.js\");\n\n\nrouter.post(\"/signup\", Users.postUser);\nrouter.post(\"/login\", Users.loginUser);\nrouter.delete(\"/:userId\",checkAuth, Users.deleteUser);\n\nmodule.exports = router;\n\n\n//# sourceURL=webpack://node-rest-api/./api/routes/user.js?");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nmongoose\n  .connect(\"mongodb://localhost:27017/shop\", {\n    useNewUrlParser: true,\n    useUnifiedTopology: true,\n  })\n  .then(() => {\n    console.log(\"Connection Success...\");\n  })\n  .catch((e) => {\n    console.log(e);\n  });\n\nconst productsRoutes = __webpack_require__(/*! ./api/routes/products */ \"./api/routes/products.js\");\nconst orderRoutes = __webpack_require__(/*! ./api/routes/orders */ \"./api/routes/orders.js\");\nconst userRoutes = __webpack_require__(/*! ./api/routes/user */ \"./api/routes/user.js\");\n\n// logs hit api routes\napp.use(morgan(\"dev\"));\napp.use(bodyParser.urlencoded({ extended: false }));\napp.use(bodyParser.json());\n\n// Apply CORS\napp.use((req, res, next) => {\n  res.header(\"Access-Control-Allow-Origin\", \"*\");\n  res.header(\n    \"Access-Control-Allow-Headers\",\n    \"Origin,X-Requested-With,Content-Type,Accept,Authorization\"\n  );\n\n  if (req.method === \"OPTIONS\") {\n    res.header(\"Access-Control-Allow-Methos\", \"PUT,POST,PATCH,DELETE,GET\");\n    return res.status(200).json({});\n  }\n  next();\n});\n\napp.use((req, res, next) => {\n  const info = req.method + \" \" + res.statusCode + \" \" + req.url;\n  console.log(\"API HIT -------------->\", info, \"\\n|\\nv\\n|\\nv\\n\");\n  next();\n});\n\n\n\n// Routes which should handle requests\napp.use(\"/products\", productsRoutes);\napp.use(\"/orders\", orderRoutes);\napp.use(\"/user\", userRoutes);\n\n//  Error Handling\napp.use((req, res, next) => {\n  const error = new Error(\"Not found\");\n  error.status = 400;\n  next(error);\n});\n\napp.use((error, req, res, next) => {\n  res.status(error.status || 500);\n  res.json({\n    error: {\n      messsage: error.message,\n    },\n  });\n});\n\nmodule.exports = app;\n\n\n//# sourceURL=webpack://node-rest-api/./app.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\n\n// Port\nconst PORT = process.env.PORT || 3000;\n\n// Require routes file\nconst route = __webpack_require__(/*! ./app */ \"./app.js\");\n\napp.get(\"/ping\", (req, res, next) => {\n  return res.status(200).json({ ok: \"Ok\" });\n});\n\napp.use(\"/api\", route);\n\n// Server Up\napp.listen(PORT, () => {\n  console.log(`Server running on port ${PORT}`);\n});\n\n\n//# sourceURL=webpack://node-rest-api/./server.js?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server.js");
/******/ 	
/******/ })()
;