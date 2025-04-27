import Counter from "../models/Counter.js";

// changed prefix to remove DYPDPU at start
const getPrefix = (stream) => {
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear().toString().slice(2);
    return `${stream.toUpperCase()}${day}${month}${year}`;
}

const getNextStudId = async (stream) => {
    const currentPrefix = getPrefix(stream);
    const counter = await Counter.findOneAndUpdate(
        { counterId: stream },
        { $inc: { sequence_value: 1 } },
        { new: true }
    );
    // made padstart to 4 for 4 digit unique numbers only
    let seq = String(counter.sequence_value).padStart(4, "0");
    return currentPrefix + seq;
};

export default getNextStudId;