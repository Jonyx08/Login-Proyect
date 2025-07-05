const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://jonytdelao:Andreita18@cluster0.b0fyinm.mongodb.net/myapp")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

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