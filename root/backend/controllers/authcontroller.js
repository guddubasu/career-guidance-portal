import bcrypt from"bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";
//register---->
export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){return res.json({success:false,message:"missing deatils"});}
    try{
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            return res.json({success:false,message:"user already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new userModel({name,email,password:hashedPassword});
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV ==='production'?'none':'strict',
            maxAge:7*24*60*60*1000

        });
        //sending welcome email
        const mailOptions={
            from:process.env.SENDER_EMAIL,//pore modify korbo
            to:email,
            subject:'Welcome to CareerCompass',//pore modify korbo
            text:`Welcome to CareerCompass ,your account has been created with the email-id: ${email}`,
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}
//login---->
export const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){return res.json({success:false,message:"email and password are required"});}
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"invalid email"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"invalid password"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV ==='production'?'none':'strict',
            maxAge:7*24*60*60*1000

        });
        return res.json({success:true});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}
//logout--->
export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV ==='production'?'none':'strict',
        });
        return res.json({success:true,message:"logged out successfully"});
    }catch(error){
        
         res.json({success:false,message:error.message});
    }
}
//sending verification otp to users email
export const sendVerifyOTP=async(req,res)=>{
    try{
        const user=await userModel.findById(req.userId);
        if(user.isAccountVerified){
            return res.json({success:false,message:"account already verified"});
        }
        const OTP=String(Math.floor(100000+ Math.random()*900000));
        user.verifyOTP=OTP;
        user.verifyOTPExpireAt=Date.now()+24*60*60*1000;
        await user.save();
        const mailOptions={
            from:process.env.SENDER_EMAIL,//pore modify korbo
            to:user.email,
            subject:'Account Verification OTP',//pore modify korbo
            // text:`Your OTP is ${OTP} ,verify your account using this OTP`,
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",OTP).replace("{{email}}",user.email)
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true,message:"Verification OTP is sent to the mail"});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}
//verifying email using otp
export const verifyEmail=async(req,res)=>{
    const {otp}=req.body;
    if(!req.userId || !otp){
        return res.json({success:false,message:"missing details"});
    }
    try{
        const user=await userModel.findById(req.userId);
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        if(user.verifyOTP==='' || user.verifyOTP!==otp){
            return res.json({success:false,message:"invalid otp"});
        }
        if(user.verifyOTPExpireAt<Date.now()){
             return res.json({success:false,message:"otp expired"});
        }
        user.isAccountVerified=true;
        user.verifyOTP='';
        user.verifyOTPExpireAt=0;
        await user.save();
        return res.json({success:true,message:"email verified successfully"});
    }catch(error){
        return res.json({success:false,message:error.message});
    }

}
//checking user is authenticated or not
export const isAuthenticated=async (req,res)=>{
    try{
        return res.json({success:true});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}
//send password reset otp
export const sendResetOtp=async(req,res)=>{
    const {email} =req.body;
    if(!email){
        return res.json({success:false,message:"email is required"});
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        const OTP=String(Math.floor(100000+ Math.random()*900000));
        user.resetOTP=OTP;
        user.resetOTPExpireAt=Date.now()+15*60*1000;
        await user.save();
        const mailOptions={
            from:process.env.SENDER_EMAIL,//pore modify korbo
            to:user.email,
            subject:'Password Reset OTP',//pore modify korbo
            // text:`Your OTP for resetting your password is ${OTP}.Use this otp to proceed with resetting your password`,
            html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",OTP).replace("{{email}}",user.email)
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true,message:"otp sent to your email"});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}
//resetting password using otp
export const resetPassword=async(req,res)=>{
    const {email,otp,newPassword}=req.body;
    if(!email || !otp || !newPassword){
        return res.json({success:false,message:"email,otp and new password is required"});
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        if(user.resetOTP=== '' || user.resetOTP!== otp){
            return res.json({success:false,message:"Invalid OTP"});
        }
        if(user.resetOTPExpireAt < Date.now()){
            return res.json({success:false,message:"OTP expired"});
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.resetOTP='';
        user.resetOTPExpireAt=0;
        await user.save();
         return res.json({success:true,message:"Password has been reset successfully"});
    }catch(error){
        return res.json({success:false,message:error.message});
    }
}