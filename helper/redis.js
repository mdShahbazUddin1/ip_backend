const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("connect",async()=>{
    console.log("redis connected")
})


redisClient.on("error", async (err) => {
  console.log(err.message);
});


redisClient.connect();

module.exports = {redisClient}
