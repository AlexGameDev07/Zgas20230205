//import mongoose module
import mongoose from "mongoose";

//save db url in a constant
const uri = "mongodb://localhost:27017/zgasdb";

//create a connection to the database
mongoose.connect(uri);

//check connection status
const connection = mongoose.connection;

connection.once("open", () => {console.log("MongoDB database connection established successfully")});

connection.on("disconnected", () => {console.log("MongoDB connection disconnected")});

connection.on("error", (err) => {console.log("MongoDB connection error: ", err)});  