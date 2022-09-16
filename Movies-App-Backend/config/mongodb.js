const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/moviesdb", function(error){
    if(error){
        throw error
    }else{
        console.log("connect")
    }
})

module.exports = mongoose