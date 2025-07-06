require('dotenv').config();
const mongoose = require('mongoose');

// Debug lines - remove after fixing
console.log('DB_URL:', process.env.DB_URL);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('DB') || key.includes('MONGO')));

if (!process.env.DB_URL) {
  console.error('DB_URL environment variable is not set!');
  process.exit(1);
}

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