const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

exports.connect = client.connect();

exports.set = async (key, value, ms) => {
    try {
        return client.set(key, value, { EX: ms });
    } catch (error) {
        return Promise.reject(error);
    }
};

exports.get = async (key) => {
    try {
        return client.get(key);
    } catch (error) {
        return Promise.reject(error);
    }
};
