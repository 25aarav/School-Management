// routes/addSchool.js
import express from 'express';
import db from '../dbConfig/dbConfig.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'All fields (name, address, latitude, longitude) are required' });
    }

    if (typeof name !== 'string' || typeof address !== 'string') {
      return res.status(400).json({ message: 'Name and address must be strings' });
    }

    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);

    if (isNaN(latNum) || isNaN(lngNum)) {
      return res.status(400).json({ message: 'Latitude and longitude must be valid numbers' });
    }

    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [name.trim(), address.trim(), latNum, lngNum]);

    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (err) {
    console.error('Error inserting school:', err);
    res.status(500).json({ message: 'Failed to add school', error: err.message });
  }
});

export default router;
