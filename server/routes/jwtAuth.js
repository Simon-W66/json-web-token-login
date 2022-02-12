const express = require("express")
const router = express.Router()
const pool = require("../db.js")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization.js")
//import express from "express"
//const router = express.Router()
//import pool from "../db.js"

//registrating

router.post("/register", validInfo, async (req, res)=> {
    try {
        // 1. destructure req.body (email, name, password)
        
        const {email, name, password} = req.body; 
        //2. chech if users even exists 

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])

        if(user.rows.length > 0){
            return res.status(401).json("User already exist!")
        }
        //3. Bcrypt the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)
        //4. enter the complet user to database tables
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *", [name, email, bcryptPassword])
        //5. generating JWT token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({token})
    } catch (err) {
        console.error(err.message) 
        res.status(500).send("Server Error")
    }
}) 
router.post("/login",validInfo, async (req, res)=> {
    try {
        // 1. desctructure the req.body 
        const {email, name, password} = req.body
        // 2. check if user doesn't exist(if not then throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
        if(user.rows.length === 0){
            return res.status(401).json("Password or email is incorrect") //unauthentificated
        }
        // 3. check if comming password isn't the same as the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
        if(!validPassword){
            return res.status(401).json("Passowrd or email is incorrect")
        } 
        // 4. give them jwt token for 24hours
        const token = jwtGenerator(user.rows[0].user_id)
        return res.json({token})
         

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
router.get("/is-verify",authorization, async (req, res)=> {
    try {
        res.json(true)
    } catch (error) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router; 