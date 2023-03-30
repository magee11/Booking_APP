const Hotel = require("../models/Hotel");
const createError = require("../utils/error");
//create

const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    savedHotel = await newHotel.save();
    res.send(savedHotel);
  } catch (err) {
    res.send(err);
  }
};

//update

const updateHotel = async (req, res) => {
  try {
    const updatehotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.send(updatehotel);
  } catch (err) {
    res.send(err);
  }
};
//delete
const deleteHotel = async (req, res) => {
  try {
    const deletehotel = await Hotel.findByIdAndDelete(req.params.id);
    res.send(`requested hotel was deleted id ${req.params.id}`);
  } catch (err) {
    res.send(err);
  }
};
//get

const getHotel = async (req, res) => {
  try {
    const gethotel = await Hotel.findById(req.params.id);
    res.send(gethotel);
  } catch (err) {
    res.send(err);
  }
};
//get all

const allHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.send(hotels);
  } catch (err) {
    return next(createError(202, "page not found"));
  }
};
module.exports = { allHotels, getHotel, deleteHotel, updateHotel, createHotel };
