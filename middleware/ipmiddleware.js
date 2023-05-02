

const ipMidlleware = (req,res,next)=>{
      const { ip } = req.params;
      if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) {
        return res.status(400).json({ message: "Invalid IP address" });
      }else{
        next()
      }
   
}


module.exports = {
    ipMidlleware
}