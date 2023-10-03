const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.put('/updateincome/:id',(req,res)=>{
   
    const id=req.params.id;
    
    const companyname=req.body.CompanyName;
        const streetaddress=req.body.StreetAddress;
        const city=req.body.City;
        const pincode=req.body.Pincode;
        const state=req.body.State;
        const placeofsupply=req.body.PlaceofSupply;
        const particulars=req.body.Particulars;
        const psyear=req.body.PSYear;
        const GSTIN=req.body.GSTIN;
        const hsnsac=req.body.HSNSAC;
        console.log(req.body.DueDate)
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
        const sql=`Select InvoiceNumber,Status from income_table where id=${id}`;
        pool.query(sql,(err,data)=>{
          if(err)
          {
             console.error("Error executing query: " + err.stack);
          return res.status(500).json({ error: "Database error" });
          }
          const oldStatus=data[0].Status;
          if(req.body.Status=='Paid' && oldStatus=='UnPaid')
          {
            
            const sql=`Update income_table SET Status='Paid' where id=${id}`;
            pool.query(sql,(err,data)=>{
                 if(err){
            console.error("Error executing query: " + err.stack);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({status:200, message: "Record updated successfully" });
            })
          }
          else{
           
            const sql="UPDATE income_table SET CompanyName=?,StreetAddress=?,City=?,State=?,Pincode=?,PlaceofSupply=?,GSTIN=?,Particulars=?,PSYear=?,HSNSAC=?,Rate=?,DueDate=?,CGST=?,SGST=?,IGST=?,TotalAmount=?,BalanceDue=?,`Status`=?,Items=?,ActionDate=? where id=?";
    pool.query(sql,[companyname,streetaddress,city,state,pincode,placeofsupply,GSTIN,particulars,psyear,hsnsac,rate,duedate,cgst,sgst,igst,totalamount,balancedue,status,details,actiondate,id],(err,data)=>{
         if(err){
            console.error("Error executing query: " + err.stack);
          return res.status(500).json({ error: "Database error" });
        }
         res.status(200).json({status:200, message: "Record updated successfully" });
       
    })
          }
        })
    
    })