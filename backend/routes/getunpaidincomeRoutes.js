const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/getUnpaidTotalIncomeRate',(req,res)=>{
    const sql=`Select sum(TotalAmount) as Total from income_table where Status='UnPaid' and IsDeleted=0`;
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        return res.json(data)
    })
})
