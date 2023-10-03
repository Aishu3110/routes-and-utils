const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get('/getexpensedetails',(req,res)=>{
    const sql="SELECT id,InvoiceNumber,CGST,Particulars,PaymentType,AccountType,Amount,SGST,IGST,TotalAmount,DueDate,ActionDate from expense_table where  IsDeleted=0";
    pool.query(sql,(err,data)=>{
        if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        return res.json(data)
    })
})