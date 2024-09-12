const jwt = require("jsonwebtoken");

module.exports.verifyJwt=(req,res,next)=>{
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' })
    }
    const token = authorization.split(' ')[1];

    jwt.verify(token,process.env.SECURE_TOKEN,(err, decoded) =>{
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized access' })
          }
          req.decoded = decoded;
          next();
    })
}