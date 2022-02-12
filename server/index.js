const express = require("express")
const app = express()
const cors = require("cors")

//MIDDLEWARE
app.use(cors());
app.use(express.json()); //allow connect client sidee //req.body

//ROUTES

//register and login

app.use("/auth", require("./routes/jwtAuth.js"));
 
app.use("/dashboard", require("./routes/dashboard.js"))

app.listen(5000, () => {
    console.log("server is listening on port 5000")
})  