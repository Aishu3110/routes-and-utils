const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.post("/api/account-summary", (req, res) => {
    const { account, limit_amount, balance, date } = req.body;
    const query =
      "INSERT INTO account_summary (account, limit_amount, balance, date, created_at, updated_at, is_deleted) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0)";
    const values = [account, limit_amount, balance, date];
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error("Error adding a new record: " + err.stack);
        return res.status(500).json({ error: "Database error" });
      }
  
      res.json({ message: "Record added successfully", id: result.insertId });
    });
  });