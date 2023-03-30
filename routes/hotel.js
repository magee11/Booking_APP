const express = require("express");
const router = express.Router();
const {allHotels,getHotel,deleteHotel,updateHotel,createHotel} = require("../controllers/hotel")
const verify = require("../utils/verifyToken")

router.get('/getHotel/:id',verify,getHotel)
router.get('/allHotels',allHotels)
router.post('/createHotel',createHotel)
router.put('/updateHotel/:id',updateHotel)
router.delete('/deleteHotel/:id',deleteHotel)

module.exports = router;
