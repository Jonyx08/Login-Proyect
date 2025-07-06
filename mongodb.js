require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})



const collection=new mongoose.model("Collection1",LogInSchema)

module.exports=collection