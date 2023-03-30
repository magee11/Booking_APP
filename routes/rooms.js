const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is Auth rooms");
});

module.exports = router;
