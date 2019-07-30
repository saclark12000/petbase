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
});

//Text Index creation
petSchema.index({
                     name: 'text',
                     species: 'text',
                     breed:'text',
                     description: 'text'
               });

module.exports = mongoose.model("Pet", petSchema);