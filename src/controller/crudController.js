const Crud = require('../model/crudModel')
const User = require('../model/user')


// user data create
exports.Create = async (req, res) =>{
    try{
        const {title, desc, status} = req.body  
        const crud = new Crud({title, desc,status,user:req.userId})
        const savedata =  await crud.save()
        await User.updateOne({_id: req.userId}, {$push:{ todos: savedata._id}})
        res.status(201).json({Message: "Record Create successful"})

    }catch(err){
        console.log("Server Side err!")
        res.status(500).json({Message: "server side err!"})
    }
}



// user data read
exports.Readdata = async (req, res) =>{
    try{
        const userid = req.userId
        await Crud.find({user: userid}, {title: 1, desc: 1, status: 1, _id: 0})
        .then((data) =>res.status(200).json({ Result: data }))

    }catch(err){
        console.log("Server Side err!")
        res.status(500).json({Message: "server side err!"})
    }
}


// user data update
exports.Updatedata = async (req, res) =>{
    try{
          const id = req.params.id
          const {title, desc, status} = req.body

       const userexits =  await Crud.findOne({_id: id})
       if(userexits){
        await Crud.updateOne({_id: id}, {$set: {title, desc, status}})
        res.status(202).json({Message: "Record Update successful"})
       }else{
        res.status(404).json({Message: "User not found"})
       }


    }catch(err){
        console.log("Server Side err!")
        res.status(505).json({Message: "server side err!"})
    }
}


// user data delete
exports.Deletadata = async (req, res) =>{
    try{
          const id = req.params.id

          const userexits =  await Crud.findOne({_id: id})
          if(userexits){
           await Crud.deleteOne({id})
           res.status(202).json({Message: "Record delete successful"})
          }else{
           res.status(404).json({Message: "User not found"})
          }

    }catch(err){
        console.log("Server Side err!")
        res.status(500).json({Message: "server side err!"})
    }
}



// Active status
exports.status = async (req, res) =>{
    try{
        const status = req.params.status
        const userid = req.userId
          await Crud.find({user: userid, status},{title: 1, desc: 1,status: 1, _id: 0})
        .then((data) =>res.status(200).json({ Result: data }))

    }catch(err){
        console.log("Server Side err!")
        res.status(500).json({Message: "server side err!"})
    }
}



exports.ReadDate = async (req, res) =>{
    try{
        const {FromDate, ToDate} = req.body
        if(!FromDate || !ToDate){
            res.status(404).json({ Message: "Pls! Proper date full fill"})
        }

        const userid = req.userId
        await Crud.find({user: userid,createdAt: {$gte: FromDate, $lte: ToDate}}, {title: 1, desc: 1, status: 1, _id: 0})
        .then((data) =>res.status(200).json({ Result: data }))

    }catch(err){
        console.log("Server Side err!")
        res.status(500).json({Message: "server side err!"})
    }
}