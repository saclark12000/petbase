var mongoose = require("mongoose")

var petSchema = new mongoose.Schema({
   name: String,
   images: {
      cover: String,
      album: []
   },
   description: String,
   species: String,
   breed: [],
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: "String"
   },

   adoptable: {
      type: Boolean,
      default: false
  }

   // Future Update Ideas ------------------------
   // Adoptable Status ---> Location
   // sex ---> Spay/neutured
   // Chip ID #
   // when pet was added
   // Pet est age
   // Pet weight
   // Primary/Secondary color
   // location

});

// Text Index name is PetsTextIndex

module.exports = mongoose.model("Pet", petSchema);