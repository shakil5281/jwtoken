const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    username: {
        type: String,
        requried: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        requried: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        requried: true
    },
    cpassword: {
        type: String,
        requried: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        }
    ],
})

//  userSchema.pre('save'&& "updateOne" , async function(next){
//      if(this.isModified('password')){
//          this.password = await bcrypt.hash(this.password, 12);
//          this.cpassword = await bcrypt.hash(this.cpassword, 12)
//      }
//      next()
//  })


userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({username: this.username}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;

    }catch(err){
        console.log("User Token" + err)
    }
}


const User = mongoose.model("User", userSchema)

module.exports = User;