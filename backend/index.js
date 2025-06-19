const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5001;
const MONGO = process.env.MANGO;
const actorRoutes = require("./routes/actor");

//Used to parse data to json
app.use(express.json()); //Middleware
app.use(cors());    //Middleware

app.get("/", (req,res)=>{
    res.send("Movie Stars")
})
app.use("/actors", actorRoutes);

mongoose.connect(MONGO, {
}).then(()=> console.log("DB connected to moviestars"))
    .catch(err =>console.error(err))

app.listen(PORT, ()=>{
    console.log(`listening to port: localhost:${PORT}`);
    
})