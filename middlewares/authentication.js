

const User = require("../models/user");

const tokenHelpers = require('../helpers/token')
module.exports =async (req,res,next)=>{
   try{
    const token = req.headers.authorization;
    const payload = await tokenHelpers.verify(token)
    const userId = payload.userId
    req.currentUser = await User.findAll({
        where:{id:userId}
    })
    next()
   }catch(err){
    res.status(404).json({message:"failed auth."})
    console.log(err)
   }
}