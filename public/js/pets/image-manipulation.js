var mongoose = require('mongoose'),
    sharp = require('sharp'),
    path = require('path'),
    fs = require('fs');

imgMan = {};

imgMan.processImg = function(imgPath){
    //Allow source file to be deleted after upload
    sharp.cache(false);
    //Path to file from this file
    var imgURL = path.join(__dirname, "../../", imgPath);
    //Path to file from here + a random name + extension
    var finURL = 'public/uploads/imgs/'+mongoose.Types.ObjectId()+path.extname(imgPath);

    //Using sharp library to resize files
    sharp(imgURL)
    .resize(250, 250, {
        fit: 'cover'
    })
    .toFile(finURL)
    .then(()=>{
        //Removes original file after resize
        fs.unlink(imgURL, (err) => {
            if (err) {
              console.error(err)
              return
            }
        })
    })
    .catch(()=>{console.log('Error during the image transformation.')});
    // Sending back resized file's url with leading 'public' removed, static
    return finURL.slice(6)  
}

imgMan.removeImg = function(imgPath){
    //Path to file from this file
    var imgURL = path.join(__dirname, "../../", imgPath);
    fs.unlink(imgURL, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })
}

module.exports = imgMan;