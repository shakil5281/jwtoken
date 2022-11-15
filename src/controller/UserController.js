const User = require('../model/user') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



// User Registration
exports.register = async (req, res) =>{

    const {name, username,  email, password, cpassword} = req.body
    if(!name || !username|| !email || !password || !cpassword){
        return res.status(422).json({ Error: "Pls ! Data insert full fill."})
    }

    try{
        const userexits =  await User.findOne({username: username})
        if(userexits){
            res.status(404).json({ Error: "User alreday Existing"})
        }else if(password != cpassword){
            res.status(404).json({ Error: "Password Not Match"})
        }else{
            const user = new User({name, username,  email, password, cpassword})
            await  user.save()           
            res.status(201).json({Massage : "Data successfully insert"}) 
        }
          
    }catch(err){
        res.status(505).json({error: "server side err!"})
        console.log(err)
    }
}


// User Login

exports.login = async (req, res) =>{
    try{
        const {username, password} = req.body
            if(!username || !password){
                res.clearCookie("jwtoken")  
                return res.status(422).json({ Error: "Pls ! Proper form full fill."})
            }

            const userexits =  await User.findOne({username: username})
            if(userexits){
                res.clearCookie("jwtoken")
                const isMatch = await bcrypt.compare(password, userexits.password)
                console.log(isMatch)
                const token = await userexits.generateAuthToken()
                res.cookie("jwtoken", token, {
                  expires: new Date(Date.now() + 25892000000),
                  httpOnly: true
                })
                if(isMatch){
                    res.status(200).json({Massage : "Login Successfull"}) 
                }else{
                    res.clearCookie("jwtoken")
                    res.status(404).json({Massage : "Passwrod dose not match!"}) 
                }
            }else{
                res.clearCookie("jwtoken")
                res.status(404).json({Massage : "Username dose not match!"}) 
            }
    }

    catch(err){
        res.status(505).json({error: "server side err!"})
        console.log(err)
    }
}



// Update Password
exports.passwordUpdate = async (req, res) =>{
    const pass = req.body.password
    const cpass = req.body.cpassword
    if(!pass || !cpass){
        return res.status(422).json({ Error: "Pls ! Data insert full fill."})
    }
    try{
        if(pass != cpass){
            res.status(404).json({ Error: "Password dose not match"})
        }else{
            const Username = req.username
            const  password = await bcrypt.hash(pass, 12)
            const cpassword = await bcrypt.hash(cpass, 12)
             await User.updateOne({Username}, { $set:{password: password, cpassword: cpassword}})
             res.status(200).json({ Error: "Password Update Successfull"})
        }

    }catch(err){
        res.status(505).json({error: "server side err!"})
        console.log(err) 
    }
}