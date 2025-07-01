import { upsertStreamUser } from "../config/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    //check if email is valid format or not
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exixts" });
    }
    // const idx = Math.floor(Math.random() * 100);
 

    const idx = Math.random().toString(36).substring(2, 12); // 10-char random
const avatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    console.log(avatar);

    const newUser = await User.create({
      email,
      password,
      fullName,
      profilePic: avatar,
      isOnboarded: false, 
    });
 
     // stream is pending to be done
    try {
       await upsertStreamUser({
      id:newUser._id.toString(),
      name:newUser.fullName,
      image:newUser.profilePic || "",
     })
     console.log(`Stream user created for ${newUser.fullName}`)
    } catch (error) {
       console.log("Error creating stream user:", error.message);
    }
    const tokenData = {
      userId: newUser._id,
    };
   
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("error in signup controller", error);
    res.status(500).json({ message: "someting went wrong (signup)" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid email or password" });
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent XSS attacks
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

export const onboard = async(req,res)=>{
try {
  
   const userId = req.user._id;
const {fullName ,bio,nativeLanguage ,learningLanguage,location} = req.body;

if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
  return res.status(400).json({
    message: "All fields are required",
    missingFields: [
      !fullName && "fullName",
      !bio && "bio",
      !nativeLanguage && "nativeLanguage",
      !learningLanguage && "learningLanguage",
      !location && "location"
    ].filter(Boolean)
  });
  }
  
 const updateUser  =  await User.findByIdAndUpdate(userId, {
    // fullName,
    // bio,
    // nativeLanguage,
    // learningLanguage,
    // location,
    ...req.body,
    isOnboarded: true,
      },{ new: true});

      if(!updateUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // stream user update
      res.status(200).json({
        success: true,
        message: "User onboarded successfully",
        user: updateUser, 
              });

              //TODO update stream user
              try {
                await upsertStreamUser({
                id: updateUser._id.toString(),
                name: updateUser.fullName,
                image: updateUser.profilePic || "",
              })
                console.log(`Stream user updated for ${updateUser.fullName}`);
              } catch (streamError) {
                console.log("Error updating stream user",streamError.message );
              }

} catch (error) {
  console.log("Error while onboarding", error);
  return res.status(500).json({ message: "Internal server error during onboarding" });
}
}