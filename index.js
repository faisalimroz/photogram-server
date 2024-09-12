const express = require('express')
const app = express()
const cors=require('cors')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const port =process.env.PORT || 3000
require('dotenv').config()
app.use(express.json())
app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
}));
// DB Connection

mongoose.connect(process.env.DB_CONNECTION).then(()=>{
    console.log('DataBase Connected')
})


const userRouter=require('./Route/userRoute')
const userSub=require('./Route/userSubRoute/userSub')
const postRouter=require('./Route/postRoute')
const commentRoute=require('./Route/commentRoute')
const likeRoute=require('./Route/likeRoute')
// const jwtRoute=require('./Route/jwtRoute')

app.use('/api/v1/user',userRouter)
app.use('/api/v1/users',userSub)
app.use('/api/v1/post',postRouter)
app.use('/api/v1/comment',commentRoute)
app.use('/api/v1/like',likeRoute)

app.post('/api/v1/jwt',(req, res) => {
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
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.get('/', (req, res) => {
  res.send('Server Running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})