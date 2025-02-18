import { connect } from "mongoose";

const connectDB = async () => {
    try{
        const connectionString = process.env.MONGO_URI;
        if(!connectionString){
            logd("please specify the MONGO_URI in .env file")
            process.exit(1);
        }
        await connect(connectionString);
        logd("Database connected successfully");
    } catch(err) {
        logd(err);
    }
}

export default connectDB;