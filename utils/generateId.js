import Counter from "../models/Counter.js";

const getPrefix = () => {
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear().toString().slice(2);
    return `${day}${month}${year}`;
}

const getNextStudId = async () => {
    const currentPrefix = getPrefix();
    const counter = await Counter.findOneAndUpdate(
        {}, // No need for `_id` since there's only one document
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    );
    let seq = String(counter.sequence_value).padStart(5, "0");
    return currentPrefix + seq;
};

export default getNextStudId;