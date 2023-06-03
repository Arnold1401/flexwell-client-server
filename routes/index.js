const express = require('express');

const router = express.Router();
const Controller = require("../controllers/gymsController");

router.get("/pub/bodyparts/", Controller.allBodyParts);
router.get("/pub/bodyparts/:id", Controller.getBodyPartsById);

router.get('/', (req, res) => {
  res.send('hello world');
});

module.exports = router;
