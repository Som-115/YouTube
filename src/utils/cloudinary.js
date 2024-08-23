// will help give the path of the local file 
// to upload on the server

import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

// fs is a file system in node js
// it helps to perform the all file methods on file

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadClodinary = async (localfilepath) => {
    try{
        if(!localfilepath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary", response.url)
        return response;
    }
    catch(error){
        fs.unlinkSync(localfilepath)
        // remove the locally saved temporary file as the upload 
        // operation failed
        return null;
    }
}


// CLOUDINARY_URL=cloudinary://511243546628499:RlOGFD4cS8VAsEO2Btw45oBWTpk@dofiqckgx