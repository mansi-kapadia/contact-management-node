const mongoose = require("mongoose");

const connectDB = async () => {
    try{

        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connection established: " , connect.connection.host, connect.connection.name)
    }catch(err){
        console.log(err);
        process.exit();
    }
}

module.exports = connectDB;