const express=require('express');
const http=require('http');

const app=express()
const server=http.createServer(app)

app.use(express.json());

app.use('/api/users',require('../src/routes/userRoutes'))

app.get('/',async (req,res)=>{
    try
    {
        res.status(200).json({message:"wow my api works"})

    }
    catch(error)
    {
        res.status(500).json({error:"Internal server error..."})
    }
})




server.listen('8080',()=>{
    console.log("The server is listening on port 8080")
})

