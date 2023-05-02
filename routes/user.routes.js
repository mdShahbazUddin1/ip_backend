const {UserModel} = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {redisClient} = require("../helper/redis")
const express = require("express");
const { auth } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    try {
        const { name, email, password } = req.body;

        const isUserPresent = await UserModel.findOne({ email });
        if (isUserPresent) {
          return res.status(401).send("user already register");
        }
        const hash = await bcrypt.hash(password, 8);

        const newUser = new UserModel({ name, email, password: hash });

        await newUser.save();
        res.status(200).send("register successfull");
    } catch (error) {
        res.status(400).send(error)
    }
    
})


userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
         const isUserPresent = await UserModel.findOne({ email });
         if (!isUserPresent) {
           return res.status(401).send("user not found");
         }
         const isPass = await bcrypt.compare(password,isUserPresent.password);
         if(!isPass){
            return res.send({msg:"invalid credential"})
         }
         const token = await jwt.sign({
            userId:isUserPresent._id
         },process.env.SECRET,{expiresIn:"1hr"})
         res.send({msg:"login success",token})
    } catch (error) {
        res.status(401).send(error.message)
    }
})

userRouter.post("/logout",async(req,res)=>{
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token) return res.status(403);
        await redisClient.set(token,token,{EX:30})
        res.send({msg:"logout succesfull"})
    } catch (error) {
        res.send(error.message)
    }
})

module.exports = {
    userRouter
}