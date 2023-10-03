const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const generateShortRandomName = require('../utils/generateShortRandomName');
const numberToWords = require('../utils/numberToWords');

const generatepdf2 = new(require('./sample2'))()

router.get('/generatereceipt/:id',(req,res)=>{
    
    const id=req.params.id;
    const sql=`Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,Status,Items,ActionDate,CreatedAt from income_table where id=${id}`;
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
         const words=numberToWords(data[0].TotalAmount)+" "+"only";
    const randomFilename = generateShortRandomName() + '.pdf';
    generatepdf2.mypdf2(data,words,randomFilename)
    const sql=`UPDATE income_table SET PaymentReceiptFile='PaymentReceipt${id}(${(new Date(data[0].ActionDate)).toISOString().split("T")[0]})${randomFilename}' where id=${id}`
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
          if (data.affectedRows === 0) {
      return res.status(404).json({ error: "Record not updated" });
    }
    res.status(200).json({status:200, message: "Record updated successfully" });
    })
    })
})