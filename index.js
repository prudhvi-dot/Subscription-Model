import express from "express";

const app = express();

app.get("/",(req,res)=> {
    res.send("Home");
})

app.listen(3000,()=> {
    console.log("server running");
})

export default app;