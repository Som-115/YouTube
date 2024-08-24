import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apierrors.js";
import { User } from "../models/user.model.js";
import { uploadOnClodinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // console.log("register route hit")
    // res.status(200).json({
    //     message: "ok"
    // })
    // steps for the registrations
    // get user details from frontend
    // validation - not empty
    // check if user already exists : username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object -- create entry in db
    // remove password and refresh tokens field from response
    // check for user creation
    // return res

    const{fullName, email, username, password } = req.body
    console.log("email: ", email);

    if(
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "all fiels are required")
    }

    const existedUser = await User.findOne({
        $or: [ {username}, {email} ]
    })

    if(existedUser) {
        throw new ApiError(409, "userwith email or usrname is exists")
    }

    console.log(req.files);

    // multer will give us the access to files
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required ")
    }

    // to send the data without the coverimage 
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.
    coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    const avatar = await uploadOnClodinary(avatarLocalPath)
    const coverImage = await uploadOnClodinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required ")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "something went wrong while registering user")
    }

    // returning the response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered succefully ")
    )

})

export { registerUser };