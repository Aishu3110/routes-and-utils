const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.put("/api/account-summary/:id", (req, res) => {
    const accountId = req.params.id;
    const { account, limit_amount, balance, date } = req.body;
    const query =
      "UPDATE account_summary SET account = ?, limit_amount = ?, balance = ?, date = ? WHERE id = ?";
    const values = [account, limit_amount, balance, date, accountId];
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating record: " + err.stack);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.json({ message: "Record updated successfully" });
      console.log("Updating record with ID:", accountId);
      console.log("Request body:", req.body);
    });
  });
  