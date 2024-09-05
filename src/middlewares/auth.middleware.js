// will verify whether user is present or not
import { ApiError } from "../utils/apierrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Log cookies to ensure the token is being passed
        console.log("Cookies:", req.cookies);

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("Token:", token);  // <-- Add this to log the token
        if(!token) {
            throw new ApiError(401, "unauthorized request")
        }
        // Log this to make sure the secret is correct
        console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET); 
        // Verify the token using the secret from .env 
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log("Decoded Token:", decodedToken);  //log the decoded token
        // Fetch user and exclude sensitive fields
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            // todo : discuss about frontend
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})


