// routes/addSchool.js
import express from 'express';
import db from '../dbConfig/dbConfig.js';

const router = express.Router();

router.post('/', (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: 'All fields (name, address, latitude, longitude) are required' });
  }

  if (typeof name !== 'string' || typeof address !== 'string') {
    return res.status(400).json({ message: 'Name and address must be strings' });
  }

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Latitude and longitude must be numbers' });
  }

  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  const values = [name, address, parseFloat(latitude), parseFloat(longitude)];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting school:', err);
      return res.status(500).json({ message: 'Failed to add school', error: err.message });
    }

    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
});

export default router;
