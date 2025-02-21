const getNextStudId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { _id: "userId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true } // "new: true" ensures the updated document is returned
    );
    return counter.sequence_value;
};

export default getNextStudId;