import Counter from "../models/Counter.js";

const checkCounters = async() => {
    try{
        let engCounter = await Counter.findOne({ counterId: 'eng' });
        if(!engCounter){
            await Counter.create({
                counterId: "eng",
                sequence_value: 0
            });
            logd("eng counter created");
        }
        let mbaCounter = await Counter.findOne({ counterId: 'mba' });
        if(!mbaCounter){
            await Counter.create({
                counterId: "mba",
                sequence_value: 0
            });
            logd("mba counter created");
        }
        let phrCounter = await Counter.findOne({ counterId: 'phr' });
        if(!phrCounter){
            await Counter.create({
                counterId: "phr",
                sequence_value: 0
            });
            logd("phr counter created");
        }
        let lbaCounter = await Counter.findOne({ counterId: 'lba' });
        if(!lbaCounter){
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

export default checkCounters;