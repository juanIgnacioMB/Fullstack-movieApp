const mongoose = require("../config/mongodb")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
        validate:{
            validator:function(value){
                let comp = /\S+@\S+\.\S+/
            return comp.test(value)
            },
            message:"Email invalido",
            code:12000
        }
    },
    password:{
        type:String,
        
    }
    
})

userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

module.exports = mongoose.model("users",userSchema)