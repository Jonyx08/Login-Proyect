const express = require("express")
const app = express()
const path =  require("path")
const hbs =require("hbs")
const collection =require("./mongodb.js")
const cors = require("cors") 
const tempelatePath=path.join(__dirname,"templates")
const crypto = require('crypto');

app.use(cors({
  origin: 'https://midominio.vercel.app',
  methods: ['GET', 'POST']
}));
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline';"
  );
  next();
});
app.use(express.json())
app.set("view engine", "hbs")
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, "public")))
// Serve static files
app.use(express.static('public'));



app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{

    const data={
    name: req.body.name,
    password: req.body.password
    }

    await collection.insertOne(data)

    res.render("home")


})

/* esta parte es para el login donde con el const accedemos a el name y buscamos 
el password de ese usuario y si encaja lo que hace es redirigirnos a la pagina de home  */

app.post("/login", async (req, res) => {
    try {
        console.log("Looking for user:", req.body.name)
        const check = await collection.findOne({name: req.body.name})
        console.log("Found user:", check)
        
      
            if (check.password === req.body.password) {
                res.render("home")
            } else {
                res.send("wrong password")
            }
       
    } catch (error) {
        console.error("Login error:", error)
        res.send("wrong details")
    }
})



app.listen(3000,()=>{
    console.log("port connected")
})