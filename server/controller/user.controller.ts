import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email";
import { log } from "console";
export const signup = async(req:Request,res:Response)=>{
    try{
        const {fullname,email,password,contact}=req.body;

        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"user already exist with this email id"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const verificationToken=generateVerificationCode();

        user=await User.create({
            fullname,
            email,
            password:hashedPassword,
            contact:Number(contact),
            verificationToken,
            verificationTokenExpiresAt:Date.now()+24*60*60*1000,
        })

        generateToken(res,user)

        await sendVerificationEmail(email,verificationToken);

        const userWithoutPassword=await User.findOne({email}).select("-password");

        return res.status(201).json({
            success:true,
            message:"Account created successfully",
            user:userWithoutPassword,
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
};

export const login=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }

        generateToken(res,user)
        user.lastLogin=new Date();
        await user.save();

        // send user without password

        const userWithoutPassword=await User.findOne({email}).select("-password");
        return res.status(200).json({
            success:true,
            message:`Welcome back ${user.fullname}`,
            user:userWithoutPassword
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internalserver error"})
    }
}

export const verifyEmail=async(req:Request,res:Response)=>{
    try{
        const {verificationCode}=req.body;
        const user=await User.findOne({verificationToken:verificationCode,verificationTokenExpiresAt:{$gt:Date.now()}}).select("-password");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired verification token"
            })
        }

        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;
        await user.save();

        // send email 
        await sendWelcomeEmail(user.email,user.fullname);

        return res.status(200).json({
            success:true,
            message:"Email verified successfully",
            user,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error" 
        })
    }
}

export const logout=async(req:Request,res:Response)=>{
    try{
        return res.clearCookie("token").status(200).json({
            success:true,
            message:"logged out successfully."
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}

export const forgotpassword=async (req:Request,res:Response)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist"
            })
        };
        const resetToken=crypto.randomBytes(40).toString('hex')
        const resetTokenExpiresAt=new Date(Date.now() + 60*60*1000)
        user.resetPasswordToken=resetToken;
        user.resetPasswordTokenExpiresAt=resetTokenExpiresAt;
        await user.save();

        // send email
        await sendPasswordResetEmail(user.email,`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);

        return res.status(200).json({
            success:true,
            message:"Password reset link sent to your email"
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
};

export const resetPassword=async(req:Request,res:Response)=>{
    try{
        const {token}=req.params;
        const {newPassword}=req.body;
        const user=await User.findOne({resetPasswordToken:token,resetPasswordTokenExpiresAt:{$gt:Date.now()}});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired reset token"
            });
        }

        // update password
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.resetPasswordToken=undefined;
        user.resetPasswordTokenExpiresAt=undefined;

        await user.save();

        await sendResetSuccessEmail(user?.email)

        return res.status(200).json({
          success: true,
          message: "Password reset successfully",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth=async(req:Request,res:Response)=>{
    try{
        const userId=req.id;
        const user=await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                success:false,
                message:'user not found'
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfile=async(req:Request,res:Response)=>{
    try{
        const userid=req.id;
        const {fullname,email,address,city,country,profilePicture}=req.body;
        // upload image on cloudinary
        // console.log(fullname,profilePicture);
        


        let cloudResponse:any;
        cloudResponse=await cloudinary.uploader.upload(profilePicture);
        const updateData={fullname,email,address,city,country,profilePicture};
        const user=await User.findByIdAndUpdate(userid,updateData,{new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user,
            message:"Profile updated successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
}