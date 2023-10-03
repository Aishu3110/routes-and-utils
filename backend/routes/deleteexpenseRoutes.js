const express = require('express');
const router = express.Router();
const pool = require('../db/db');


router.put('/deletesingleexpenserecord/:id',(req,res)=>{
    const id=req.params.id;
    const sql=`UPDATE expense_table SET IsDeleted=1 where id=${id}`
    pool.query(sql,(err,data)=>{
        if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(300).json({ message: "Record deleted successfully" });
        
    })
})