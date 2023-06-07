const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1/UserLogin',{
    useNewUrlParser:true,
     useUnifiedTopology:true
})
.then(()=>{
    console.log("connected to the database");
})
.catch(e=>{
    console.log(e);
})

const logInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const insertUserData=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    }
})


const collection=new mongoose.model("LoginData",logInSchema);
const userData=new mongoose.model("UserDetails",insertUserData);

module.exports={collection, userData};
