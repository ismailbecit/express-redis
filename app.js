const express = require("express");
const app = express();
const redis = require("./config/redis");
const Account = require("./utils/User.json");

redis.connect;

app.get("/user", async (req, res) => {
    const user = Account;
    const redisKey = "account";
    const redisData = await redis.get(redisKey);
    if (redisData !== null) {
        console.log("geldi");
        return res.status(200).json({
            message: "Listeleme Başarılı",
            user,
        });
    }

    try {
        await redis.set(redisKey, JSON.stringify(user), 500);
        return res.status(200).json({
            message: "Listeleme Başarılı",
            user,
        });
    } catch (error) {
        return res.status(400).json(error);
    }
});

app.listen(8080);
