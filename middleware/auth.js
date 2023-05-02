const jwt = require("jsonwebtoken");
const {redisClient} = require("../helper/redis");


const auth = async(req,res,next)=>{
    try {
       const token = req.headers?.authorization?.split(" ")[1];
       if(!token ) return res.status(401).send({msg:"please login"});
       const isTokenValid = await jwt.verify(token,process.env.SECRET);
       if(!isTokenValid)
       return res.send("Authentucation failed,login again")
       const isBlacklisted = await redisClient.get(token);
       if(isBlacklisted)
       return res.send("unauthorized");
       req.body.userId = isTokenValid.userId
       next()
    } catch (error) {
        return res.send(error.message);
    }
}

module.exports = {
auth
}