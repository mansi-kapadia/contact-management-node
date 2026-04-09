const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenc = require("dotenv").config();
const connectDB = require("./config/dbConnection")

connectDB();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/contacts" , require("./routes/contactRoutes"));
app.use("/api/users" , require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT , () => {
    console.log("server running on " + PORT)
});

