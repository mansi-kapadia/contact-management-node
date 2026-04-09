const asyncHandler = require("express-async-handler")
const  jwt = require("jsonwebtoken")

const ValidateToken = asyncHandler(async (request, response, next) =>{
    let token ;

    let authHeader = request.headers.authorization || request.header.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        jwt.verify(token , process.env.ACCESSTOKENSECRET , (err , decoded) => {
            if(err) {
                response.status(401)
                throw new Error("User id not authorised.")
            }
            console.log(decoded);
            request.user = decoded.user;
            next();           
        })

        if(!token){
            response.status(400);
            throw new Error("User not authorised.")
        }
    }

});

module.exports = ValidateToken;