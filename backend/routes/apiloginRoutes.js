const express = require('express');
const router = express.Router();
const pool = require('../db/db');
var jwt = require('jsonwebtoken');

router.post("/api/login", async (req, res) => {
    console.log("api login")
    const { email, password } = req.body;
    console.log(req.body)
    const getUserQuery = "SELECT * FROM userlogin WHERE email = ?";
    pool.query(getUserQuery, [email], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
        return;
      }
      console.log(results);
      if (results.length > 0) {
        const user = results[0];
        console.log(user, "user", "password", password);
        if (user.password === password) {
          var token = jwt.sign({email:req.body.email,id:results[0].id}, 'mysecret');   
    res.status(200).json({ userId: user.id, message: "Login successful" ,token:token});
  
          
        } else {
          res.status(401).json({ error: "Invalid email or password" });
        }
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    });
  });
  