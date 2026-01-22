

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';



export const register= async (req,res)=>{

    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    try {

        const existingUser= await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword= await bcrypt.hash(password,10);  
        const user= new userModel({
            name,
            email,
            password:hashedPassword
        });
        await user.save();
        //store user in db

        const token= jwt.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn:'7d'
        });
        res.cookie("token", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production" ? "none" : "strict",
            maxAge:7*24*60*60*1000 //7 days
        });
         //sending welcome email
        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: email,
            subject:'Welcome to Our Application',
            text:`welcome to our application! We are glad to have you on board. Your account has been successfully created with ${email}.`

        };
        await transporter.sendMail(mailOptions);
        
        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}
export const login= async (req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        return res.json({success:false,message:"All fields are required"});


    }
    try {

        const user= await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"});
        }

        const token= jwt.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn:'7d'
        });
        res.cookie("token", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production" ? "none" : "strict",
            maxAge:7*24*60*60*1000 //7 days

        });

        return res.json({success:true,message:"Login successful"});

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
     
}

export const logout= async (req,res)=>{
    try {
        res.clearCookie("token",{   
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production" ? "none" : "strict",
        });
        return res.json({success:true,message:"Logout successful"});
    } catch (error) {
        return res.json({success:false,message:error.message}); 
    }
}
  // send verfication otp to user

export const sendVerifyOtp= async (req,res)=>{
    try {

        // const {userId}= req.body;
        const userId = req.userId;

        const user= await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({success:false,message:"Account already verified"});
        }

        // Generate and send OTP
        const otp= String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp= otp;
        user.verifyOtpExpiredAt= Date.now() + 15*60*1000; //15 minutes
        await user.save();

        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject:'Verify Your Email',
            // text:`Your verification OTP is ${otp}. Please use this code to verify your email address.`,
            html : EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}" , user.email)

        };
        await transporter.sendMail(mailOptions);

        return res.json({success:true,message:"OTP sent successfully"});

    } catch (error) {

        res.json({success:false,message:error.message});
        
    }
}

// verify email with otp

export const verifyEmail= async (req,res)=>{
    // const {userId, otp}= req.body;
    const userId = req.userId;
   const { otp } = req.body;


        if(!userId || !otp){
            return res.json({success:false,message:"All fields are required"});
        }
    
    try {
        
        const user= await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        if( user.verifyOtp==='' || user.verifyOtp !== otp){
            return res.json({success:false,message:"Invalid OTP"});
        }

        if(user.verifyOtpExpiredAt < Date.now()){
            return res.json({success:false,message:"OTP has expired"});
        }
        user.isAccountVerified= true;
        user.verifyOtp= '';
        user.verifyOtpExpiredAt= 0;
        await user.save();
        return res.json({success:true,message:"Email verified successfully"});
    } catch (error) {
        res.json({success:false,message:error.message});    
    }
}   

// check if user isauthenticated

export const isAuthenticated= async (req,res)=>{

    try {
        
        return res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// send password reset otp

export const sendPasswordResetOtp= async (req,res)=>{

    const {email}= req.body;
    if(!email){
        return res.json({success:false,message:"Email is required"});
    }

    try {

        const user= await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }

        // Generate and send OTP
        const otp= String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp= otp;
        user.resetOtpExpiredAt= Date.now() + 15*60*1000; //15 minutes
        await user.save();

        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject:'Reset Your Password',
            // text:`Your password reset OTP is ${otp}. Please use this code to reset your password.`
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}" , user.email)
        };
        await transporter.sendMail(mailOptions);

        return res.json({success:true,message:"OTP sent successfully"});

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

// reset user password

export const resetPassword= async (req,res)=>{
    const {email, otp, newPassword}= req.body;
    if(!email || !otp || !newPassword){
        return res.json({success:false,message:"All fields are required"});
    }
    try {

        const user= await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        if( user.resetOtp==='' || user.resetOtp !== otp){
            return res.json({success:false,message:"Invalid OTP"});
        }
        if(user.resetOtpExpiredAt < Date.now()){
            return res.json({success:false,message:"OTP has expired"});
        }
        const hashedPassword= await bcrypt.hash(newPassword,10);
        user.password= hashedPassword;
        user.resetOtp= '';
        user.resetOtpExpiredAt= 0;
        await user.save();
        return res.json({success:true,message:"Password reset successfully"});
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}