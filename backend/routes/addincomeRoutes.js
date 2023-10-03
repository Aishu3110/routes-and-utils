const express = require('express');
const router = express.Router();
const pool = require('../db/db');


// add income 
router.post('/addincome',(req,res)=>{
 
    const companyname=req.body.CompanyName;
    const streetaddress=req.body.StreetAddress;
    const city=req.body.City;
    const state=req.body.State;
    const pincode=req.body.Pincode;
    const placeofsupply=req.body.PlaceofSupply;
    const particulars=req.body.Particulars;
    const psyear=req.body.PSYear;
    const GSTIN=req.body.GSTIN;
    const hsnsac=req.body.HSNSAC;
    const duedate = req.body.DueDate;
    const actiondate =req.body.ActionDate; 
    const rate=req.body.Rate;
    const cgst=req.body.CGST;
    const sgst=req.body.SGST;
    const igst=req.body.IGST;
    const totalamount=req.body.TotalAmount;
    const balancedue=req.body.BalanceDue;
    const status=req.body.Status;
    const details=req.body.Items;
    const sql="INSERT INTO income_table (CompanyName,StreetAddress,City,State,Pincode,PlaceofSupply,DueDate,GSTIN,Particulars,PSYear,HSNSAC,Rate,CGST,SGST,IGST,TotalAmount,BalanceDue,`Status`,Items,ActionDate) VALUES ?";
    const value=[[companyname,streetaddress,city,state,pincode,placeofsupply,duedate,GSTIN,particulars,psyear,hsnsac,rate,cgst,sgst,igst,totalamount,balancedue,status,details,actiondate]];
    pool.query(sql,[value],(err,data)=>{
     if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
     let id=data.insertId;
     req.body.id=id;
     console.log(id)
    const sql=`UPDATE income_table SET InvoiceNumber='PS/${psyear}/00${id}' where id=${id}`
    pool.query(sql,(err,data)=>{
         if(err){
        console.error("Error executing query: " + err.stack);
      return res.status(500).json({ error: "Database error" });
    }
         return res.status(200).json({"message":"Record Inserted"})
    })
      
})
    
})

module.exports = router;