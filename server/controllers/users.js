import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { INVALID_CREDENTIALS, USERNAME_DNE, USER_ALREADY_EXISTS } from '../constants/index.js';

import User from '../models/user.js';


export const signin= async (req,res)=>{
    //sign in logic goes here
    const {email,password}= req.body;

    try {
        const existingUser= await User.findOne({email});
        if(!existingUser)
            return res.status(401).json({message:USERNAME_DNE});

        const isPasswordCorrect= await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect)
            return res.status(401).json({message:INVALID_CREDENTIALS});
        const token=jwt.sign({email: existingUser.email, id: existingUser._id}, 'test',{expiresIn:"1h"});//move test to env
        res.status(200).json({ result: existingUser, token})
    } catch (error) {
        res.status(500).json({message:'Something went wrong.'});
    }


}
export const signup= async (req,res)=>{
    //sign up logic goes here
    const {email,password,name}= req.body;

    try {
        const existingUser= await User.findOne({email});

        if(existingUser)
            return res.status(403).json({message:USER_ALREADY_EXISTS});


        const hashedPassword= await bcrypt.hash(password,12);

        const result= await User.create({email,password: hashedPassword,name})
        const token= jwt.sign({email: result.email,id: result._id},'test',{expiresIn:"1h"});
        res.status(200).json({ result, token})
    } catch (error) {
        res.status(500).json({message:'Something went wrong.'});
    }


}