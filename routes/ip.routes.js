const axios = require("axios")
const express = require("express");
const { redisClient } = require("../helper/redis");
const { ipMidlleware } = require("../middleware/ipmiddleware");
const cityIp = express.Router();

cityIp.get("search/:ip",ipMidlleware, async (req, res) => {
  const { ip } = req.params;

  try {
    const cachedInfo = await redisClient.get(ip);
    if (cachedInfo) {
      const { city } = JSON.parse(cachedInfo);
      return res.json({ city });
    }

    const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);

    await redisClient.set(ip, 21600, JSON.stringify(data));

    return res.json({ data});
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = {
    cityIp
}