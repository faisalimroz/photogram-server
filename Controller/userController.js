const user = require('../model/user');

module.exports.createUser = async (req, res) => {
  try {

    const userData = req.body
    const existing = await user.findOne({ email: userData.email })

    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new user(userData);
    const result = await newUser.save()
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  }
}

module.exports.getUser=async(req,res)=>{
  try {
    const { searchQuery } = req.query;

    const filter = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } }, 
        { location: { $regex: searchQuery, $options: 'i' } },
      ],
    };
    if (searchQuery) {
      const result = await user.find(filter);
      res.status(200).json({status:true,data:result});
   }
  } catch (error) {
    console.log(error)
  }
}
module.exports.countUser=async(req,res)=>{
  try {
    const users= await user.estimatedDocumentCount()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
}
module.exports.getUserOne = async (req, res) => {
  try {
    const email = req.params.email

    const result = await user.findOne({ email: email });
    if (result?.email) {

      return res.status(200).json({
        status: true,
        data: result
      });
    }
    return res.json({ status: false })
  } catch (error) {
    console.log(error)
  }


}
module.exports.getUserOnebyId = async (req, res) => {
  try {
    const id = req.params.id

    const result = await user.findOne({ _id: id });


   

      return res.status(200).json(
       
         result
      )
  
   


  } catch (error) {
    console.log(error)
  }


}

module.exports.updateProfile = async (req, res) => {
  try {
    const updateUser = req.body
    const id = req.params.id

    const result = await user.updateOne({ _id: id }, { $set: updateUser })
     res.status(200).json(
       
      result
   )
  } catch (error) {
    console.log(error)
  }
}