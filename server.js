const express = require("express");
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Require routes file
const route = require("./app");

app.get("/ping", (req, res, next) => {
  return res
    .status(200)
    .json({ ok: "Ok with ci-cd test----&&&---_____*******------>" });
});

app.use("/api", route);

// Server Up
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
