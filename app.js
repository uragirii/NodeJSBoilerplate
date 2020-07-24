// Submission by Apoorv Kansal 17BEC1162
const express = require("express")
const bodyParser = require("body-parser")

// Database connections
const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect("mongodb://localhost:27017/udaan-2020", {useNewUrlParser : true})
db.on('error', ()=>{
    console.log("Cannot Connect to MongoDB Database. Check if Mongo Demon is Running")
})
db.once('open', ()=>{
    console.log("MongoDB Database Connected")
})

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const authenticateAdmin = (req, res, next)=>{
    const authHeader = req.headers['authorization']
    console.log(req.headers)
    // Bearer <token> 
    const token = authHeader && authHeader.split(" ")[1]
    if(!token) res.status(401).json({err: "Not authorized"})
    else{
        jwt.verify(token, secretMsg, (err, decoded)=>{
            if (err) res.status(500).json({err: "Error occured while verifying token"})
            if (decoded.type !== "ADMIN"){
                res.status(401).json({err :"Not authorized"})
            }
            else{
                req.userId = decoded.id
                req.userType = decoded.type
                next()
            }
            
        })
    }
}



app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})