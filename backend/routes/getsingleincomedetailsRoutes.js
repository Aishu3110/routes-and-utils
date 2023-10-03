const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const generateShortRandomName = require('../utils/generateShortRandomName');

const generatepdf = new(require('./sample'))()


router.get('/getsingleincomedetails/:id',(req,res)=>{
    
    const id=req.params.id;
    const sql=`Select id,InvoiceNumber,CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,Status,Items,ActionDate,CreatedAt from income_table where id=${id}`;
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
         const randomFilename = generateShortRandomName() + '.pdf';
    generatepdf.mypdf(data,randomFilename)
    const sql=`UPDATE income_table SET InvoiceFile='Invoice${randomFilename}',InvoiceNumber='PS/${data[0].PSYear}/00${id}' where id=${id}`
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
        //  return res.status(200).json({"message":"Download Success"})
        res.download(filePath, fileName); 
    })
    })
})
