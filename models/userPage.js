const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userPageSchema = new Schema({
  username: {
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the User model
    ref: "User"
  },
  userImage: { type: String },
  savedPlaces: { type: String }
});
const UserPage = mongoose.model("UserPage", userPageSchema);
module.exports = UserPage;
