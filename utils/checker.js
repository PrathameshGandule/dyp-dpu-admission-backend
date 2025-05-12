import Counter from "../models/Counter.js";

const checkCounters = async () => {
    try {
        let engCounter = await Counter.findOne({ counterId: 'eng' });
        if (!engCounter) {
            await Counter.create({
                counterId: "eng",
                sequence_value: 0
            });
            logd("eng counter created");
        }
        let mbaCounter = await Counter.findOne({ counterId: 'mba' });
        if (!mbaCounter) {
            await Counter.create({
                counterId: "mba",
                sequence_value: 0
            });
            logd("mba counter created");
        }
        let phrCounter = await Counter.findOne({ counterId: 'phr' });
        if (!phrCounter) {
            await Counter.create({
                counterId: "phr",
                sequence_value: 0
            });
            logd("phr counter created");
        }
        let lbaCounter = await Counter.findOne({ counterId: 'lba' });
        if (!lbaCounter) {
            await Counter.create({
                counterId: "lba",
                sequence_value: 0
            });
            logd("lba counter created");
        }
    } catch (err) {
        logd(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const envChecker = () => {
    let isEnvMissing = false;
    if (!process.env.MONGO_URI) {
        console.log("Please specify MONGO_URI in .env file - It's a MongoDB connection string");
        isEnvMissing = true;
    }
    if (!process.env.JWT_SECRET) {
        console.log("Please specify JWT_SECRET in .env file - A random secret for signing jwt tokens");
        isEnvMissing = true;
    }
    // if (!process.env.PORT) {
    //     console.log("Please specify PORT in .env file");
    //     isEnvMissing = true;
    // }
    if (!process.env.NODE_ENV) {
        console.log("Please specify NODE_ENV in .env file - must be dev if you want console logging");
        isEnvMissing = true;
    }
    if (!process.env.USER_EMAIL) {
        console.log("Please specify USER_EMAIL in .env file - an email address from which the emails would be sent");
        isEnvMissing = true;
    }
    if (!process.env.APP_PASS) {
        console.log("Please specify APP_PASS in .env file - An app password for email");
        isEnvMissing = true;
    }
    // if (!process.env.REDIS_HOST) {
    //     console.log("Please specify REDIS_HOST in .env file");
    //     isEnvMissing = true;
    // }
    // if (!process.env.REDIS_PORT) {
    //     console.log("Please specify REDIS_PORT in .env file");
    //     isEnvMissing = true;
    // }
    if(isEnvMissing){
        process.exit(1);
    }
}

export { checkCounters , envChecker };