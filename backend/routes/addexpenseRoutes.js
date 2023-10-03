const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.post('/addexpense',(req,res)=>{
    console.log(req.body)
    const invoicenumber=req.body.InvoiceNumber;
    const particulars=req.body.Particulars;
    const duedate = req.body.DueDate;
    const actiondate =req.body.ActionDate; 
    const paymentType=req.body.PaymentType;
    const accountType=req.body.AccountType;
    const amount=req.body.Amount;
    const cgst=req.body.CGST;
    const sgst=req.body.SGST;
    const igst=req.body.IGST;
    const totalamount=req.body.TotalAmount;
    const sql="INSERT INTO expense_table (InvoiceNumber,Particulars,PaymentType,AccountType,Amount,CGST,SGST,IGST,TotalAmount,DueDate,ActionDate) VALUES ?";
    const value=[[invoicenumber,particulars,paymentType,accountType,amount,cgst,sgst,igst,totalamount,duedate,actiondate]];
 pool.query(sql,[value],(err,data)=>{
     if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
    
    return res.status(200).json({"message":"Record Inserted"})
 })
   
    
})