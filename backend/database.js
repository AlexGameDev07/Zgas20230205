//import mongoose module
import mongoose from "mongoose";

//save db url in a constant
const uri = "mongodb://localhost:27017/zgasdb";

//create a connection to the database
mongoose.connect(uri);