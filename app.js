const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Success...");
  })
  .catch((e) => {
    console.log(e);
  });

const productsRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

// logs hit api routes
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Apply CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methos", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const info = req.method + " " + res.statusCode + " " + req.url;
  console.log("API HIT -------------->", info, "\n|\nv\n|\nv\n");
  next();
});


// Routes which should handle requests
app.use("/products", productsRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

//  Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      messsage: error.message,
    },
  });
});

module.exports = app;
