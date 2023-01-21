const Prebook = require("../models/PreBookUser.js");
const Room = require("../models/Rooms.js");
// Import brew-date package
const brewDate = require('brew-date');

const preBookUserRooms = async (req, res,next) => {
  const roomno = await roomById(req.body.roomid);
  try{
    const preBooking = new Prebook({
      prebookAdvance : req.body.prebookadvance,
      prebookUsername : req.body.prebookusername,
      prebookPhoneNumber : req.body.prebookphonenumber,
      prebookSecondNumber : req.body.prebooksecondnumber,
      prebookAdults : req.body.prebookadults,
      prebookChildren : req.body.prebookchildren,
      prebookAadharCard : req.body.prebookaadhar,
      prebookDateofCheckin : req.body.prebookdateofcheckin,
      prebookDateofCheckout : req.body.prebookdateofcheckout,
      prebookprice : req.body.prebookprice,
      room : req.body.roomid,
      lodge : req.params.id,
      roomno : roomno
    })
    if(preBooking){
      await Room.findByIdAndUpdate({_id : preBooking.room}, {preBooked : true, $push : {prebookuser : preBooking._id}});
    }
    await preBooking.save();
    res.status(200).json({
      success : true,
      message : "Customer has been pre-booked successfully!"
    })
  } catch (err){
    console.log(err);
    res.status(200).json({
      success : false,
      message : "Some internal error occured!"
    })
  }
}

const roomById = async (roomid) => {
  const value = await Room.findById({ _id: roomid});
  console.log("Room Number", value.roomno);
  return value.roomno;
}

// Exclude dates controller!
const excludeDates = async (req,res,next) => {
  const dates = [];
  const datesBetween = await Prebook.find({room: req.params.id});
  const dateofCheckin = datesBetween.map(obj => obj.prebookDateofCheckin);
  const dateofCheckout = datesBetween.map(obj => obj.prebookDateofCheckout);
  console.log(dateofCheckin);
  console.log(dateofCheckout);
  for(i=0; i <= dateofCheckin.length -1; i++){
    dates.push(brewDate.getBetween(dateofCheckin[i], dateofCheckout[i]));
  }
  res.status(200).json({
    success : true,
    message : dates
  })
}

const ShowAllPrebookedUser = (req,res,next) => {
  Prebook.find({room : req.params.id})
  .then(data => {
    res.status(200).json({
      success : true,
      message : data
    })
  })
  .catch(err => {
    console.log(err);
    res.status(200).json({
      success : false,
      message : "Some internal error occured!"
    })
  })
}

const ShowAllPrebookedRooms = (req,res,next) => {
  Prebook.find({lodge: req.params.id})
  .then(data => {
    console.log("Data retrieved");
    res.status(200).json({
      success : true,
      message : data
    })
  })
  .catch(err => {
    console.log(err);
    res.status(200).json({
      success : false,
      message : "Some internal error occured"
    })
  })
}

const deletePrebookUserRooms = (req,res,next) => {
  Prebook.findByIdAndDelete({_id : req.body.prebookUserId})
  .then(data => {
    console.log("Pre book user got deleted");
    res.status(200).json({
      success : true,
      message : "Pre Book user got deleted!"
    })
  })
  .catch(err => {
    res.status(200).json({
      success : false,
      message : "Some internal error occured!"
    })
  })
}

module.exports = {
  preBookUserRooms, ShowAllPrebookedUser, ShowAllPrebookedRooms,
  deletePrebookUserRooms, excludeDates
}