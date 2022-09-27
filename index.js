import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("DB connected");
    })

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    password: String,

})

const User = new mongoose.model("User", userSchema)

//Routes

app.post("/login", (req, res) => {
    const {email,password} = req.body;
    User.finOne({email:email},(err,user)=>{
        if(user){
          if(password=== user.password){
            res.send({message: "login Successfully", user:user})
          }else{
            res.send("User not registered")
            res.send({message: "password didnt match"})
          }
        } else {
            res.send({message: "user not Registered"})
        }
    })
})

app.post("/register", (req, res) => {
    const { name, email, number, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already register" })
        } else {
            const user = new User({
                name,
                email,
                number,
                password
            })

        }
    })

    User.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "successfully register" })
        }
    })
})


app.listen(9000, () => {
    console.log("Conneted to port 9000");
})