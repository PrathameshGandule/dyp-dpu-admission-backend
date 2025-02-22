import bpkg from "bcryptjs";
const { hash } = bpkg;

// Function to measure hashing time
const measureHashTime = async (password, saltRounds) => {
    console.time(`bcrypt-${saltRounds}`); // Start timer
    await hash(password, saltRounds);
    console.timeEnd(`bcrypt-${saltRounds}`); // End timer
};

// Test different salt rounds
const test = async () => {
    const password = "mySecurePass";

    for (let saltRounds of [8, 10, 12, 14, 16]) {
        await measureHashTime(password, saltRounds);
    }
};

test();