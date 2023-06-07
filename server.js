const express=require('express');
const session=require('express-session')
const mongoose=require('mongoose')
const nocache=require('nocache')
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(nocache());

 app.set("view engine","ejs");


app.use(
    session(
    {
    secret: "key that will cookie",
    resave:false,
    saveUninitialized:false,
   
})
);

app.use('/',require('./server/routes/router'));

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});