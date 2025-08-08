const express=require('express');
const User=require('./../models/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_TOKEN, { expiresIn: '3d' });
};

const signup=async(req,res)=>{
          try{
                    const {name,email,password}=req.body;

                    const userexists= await User.findOne({email});
                    if(userexists) return res.status(400).json({message:'User already exists'});

                     const hashedPassword=await bcrypt.hash(password,10);//hashing password

                     //here creting user
                    const newUser= await User.create({
                              name,
                              email,
                              password:hashedPassword,
                    });

                    const token=createToken(newUser._id);
                    res.status(201).json({message:'sign up success',token,user:newUser});
          }catch(error){
                    res.status(500).json({message:error.message});
                    
          }
};

const login=async(req,res)=>{
          try{


          const {email,password}=req.body;
           if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

          const user= await User.findOne({email});
          if(!user)return  res.status(400).json({message:'Invalid credentials'});

          //compare password
        const isMatch=  await bcrypt.compare(password,user.password);
        if(!isMatch)return res.status(401).json({message:'Invalid credentials'});

        const token=createToken(user._id);
         res.status(201).json({message:'login sucessfull',token,user:{id:user._id,username:user.name,email:user.email}});
          }catch(error){
                    res.status(500).json({message:error.message});
          }
          
}
module.exports={signup,login};