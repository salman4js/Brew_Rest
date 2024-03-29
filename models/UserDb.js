const mongoose = require("mongoose");

const userdbSchema = new mongoose.Schema({
    username : String,
    phonenumber : String,
    secondphonenumber : String,
    address: String,
    adults : String,
    childrens : String,
    extraBeds: {type: String, default: 0},
    extraBedPrice: {type: String, default: 0},
    emailid : String,
    password : String,
    aadharcard : String,
    dateofcheckin : String,
    checkinTime: String,
    expCheckinTime: String,
    actualCheckinTime: String,
    dateofcheckout : {type : String, default : ""},
    checkoutTime: {type: String, default: ''},
    stayedDays : String,
    roomno : String,
    floorNo: String,
    userid : String,
    bill : String,
    refund: {type: Number, default: 0},
    dishbill: String,
    paid : Boolean,
    isRoomTransfered: {type: Boolean, default: false},
    isUserTransfered: {type: Boolean, default: false}, // this is to keep track
    // to determine if we want to add this user details in the booking history and also to keep track of expenses.
    transferedRoomNo: {type: Number, default: 0},
    oldRoomPrice: {type: Number, default: 0}, // this is to keep track of old room price incase of room transfer!
    oldRoomNo: String,
    oldRoomStayDays: {type: Number, default: 0},
    discount: String,
    advance: String,
    isGst: {type: Boolean, default: true},
    channel: {type: String, default: "Walk-In"},
    foodGst: String,
    stayGst: String,
    totalAmount: {type: String, default: ''},
    prebooked : {type : Boolean, default : false},
    receiptId: String,
    checkinBy: String,
    checkoutBy: String,
    transferBy: String,
    room : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Rooms"
    },
    maintainanceLog: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "MaintainanceLog"
    }],
    roomType: String,
    lodge : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Lodges"
    }
})

module.exports = mongoose.model("UserDb", userdbSchema);
