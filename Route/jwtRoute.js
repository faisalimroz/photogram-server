const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
router.post('/', (req, res) => {
    try {
      const userInfo = req.body;

      const expiration = '7500h';
      const token = jwt.sign(userInfo, process.env.SECURE_TOKEN, {
        expiresIn: expiration
      });
    
    //   console.log(token)
      res.json({ token });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ message: 'Token generation failed' });
    }
  });
  
module.exports=router;