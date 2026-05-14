
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
  res.send("Backend Running");
});

app.get("/products",(req,res)=>{
  res.json([
    {id:1,name:"Watch",price:1499},
    {id:2,name:"Shoes",price:2299}
  ]);
});

app.post("/login",(req,res)=>{
  res.json({
    message:"Login Success"
  });
});

app.listen(5000,()=>{
  console.log("Server Running on Port 5000");
});
