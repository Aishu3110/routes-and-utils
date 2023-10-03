const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.delete("/api/account-summary/:id", (req, res) => {
    const accountId = req.params.id;
    const query = "DELETE FROM account_summary WHERE id = ?";
    const values = [accountId];
    pool.query(query, values, (err, result) => {
      if (err) {
        console.error("Error deleting record: " + err.stack);
        return res.status(500).json({ error: "Database error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
      res.json({ message: "Record deleted successfully" });
      console.log("Deleting record with ID:", accountId);
    });
  });