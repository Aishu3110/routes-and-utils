const express = require('express');
const router = express.Router();
const pool = require('../db/db');


router.put('/updateexpense/:id',(req,res)=>{

    const id=req.params.id;
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
    const sql="UPDATE expense_table SET InvoiceNumber=?,Particulars=?,DueDate=?,PaymentType=?,AccountType=?,Amount=?,CGST=?,SGST=?,IGST=?,TotalAmount=?,ActionDate=? where id=?";
    pool.query(sql,[invoicenumber,particulars,duedate,paymentType,accountType,amount,cgst,sgst,igst,totalamount,actiondate,id],(err,data)=>{
        if(err){
            console.error("Error executing query: " + err.stack);
          return res.status(500).json({ error: "Database error" });
        }
           if (data.affectedRows === 0) {
          return res.status(404).json({ error: "Record not updated" });
        }
        res.status(200).json({ message: "Record updated successfully" });
    })
    })