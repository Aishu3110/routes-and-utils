const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.get("/api/account-summary", (req, res) => {
    const query = "SELECT * FROM account_summary";
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json({ results });
    });
  });