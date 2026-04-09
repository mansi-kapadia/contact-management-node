const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { response } = require("express");
const  bcrypt = require("bcrypt")
const  jwt = require("jsonwebtoken")

//@desc : current user info
//@route : POST - api/users/register
//@acces : private 
const registerUser = asyncHandler(async (request , response) => {

    const { username, email, password } = request.body;

    if(!username || !email || !password){
       response.status(400);
       throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });

    if(userAvailable){
        response.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password , 10);
    console.log(hashedPassword);

    const newUser = await User.create({ username, email, password : hashedPassword })

    if(newUser) return response.status(201).json({ id : newUser.id , email : newUser.email });
    
    response.status(400)
    throw new Error("User data is not valid");
});

//@desc : current user info
//@route : POST - api/users/login
//@acces : private 
const loginUser = asyncHandler( async (request , response) =>{
    
    const { email , password } = request.body;

    if(!email || !password){
        res.send(400);
        throw new Error("All fields are mandatory");        
    }

    const user = await User.findOne({email})

    if(!user){
        res.send(400);
        throw new Error("User does not exist");        
    }

    if(user && (await bcrypt.compare(password , user.password))){        
        const accessToken = await jwt.sign({ 
            user : {
                username : user.username,
                email : user.email,
                id : user.id
            }  
        }, 
        process.env.ACCESSTOKENSECRET,
        { expiresIn : "15m" });
        response.status(200).json({accessToken});
    }
    else {
        response.status(404);
        throw new Error("Email or password is not valid")
    }
} )

//@desc : current user info
//@route : GET - api/users/current
//@acces : private 
const currentUserInfo = asyncHandler(async (request , response)=>{
    return response.status(200).json(request.user);
})

module.exports = { registerUser, loginUser, currentUserInfo }