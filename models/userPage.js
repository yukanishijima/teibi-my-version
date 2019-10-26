const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userPageSchema = new Schema({
  username: { type: String, required: true },// populate
  userImage: {type: String},  
});
const UserPage = mongoose.model("UserPage", userPageSchema);
module.exports = UserPage;