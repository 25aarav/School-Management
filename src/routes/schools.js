// routes/schools.js
import express from 'express';
import db from '../dbConfig/dbConfig.js';

const router = express.Router();

// GET /listSchools?latitude=xx&longitude=yy&page=1&limit=5
router.get('/listSchools', async (req, res) => {
  try {
    const { latitude, longitude, page = 1, limit = 5 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;

    // Query with Haversine formula to calculate distance and order by it
    const sql = `
      SELECT id, name, address, latitude, longitude,
        (6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(latitude))
        )) AS distance
      FROM schools
      ORDER BY distance ASC
      LIMIT ? OFFSET ?;
    `;

    const [results] = await db.query(sql, [userLat, userLng, userLat, limitNumber, offset]);

    // Optional: Get total count for pagination metadata
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM schools');

    res.json({
      page: pageNumber,
      limit: limitNumber,
      total,
      results: results.map(row => ({
        id: row.id,
        name: row.name,
        address: row.address,
        latitude: row.latitude,
        longitude: row.longitude,
        distance: parseFloat(row.distance.toFixed(2))
      })),
    });
  } catch (err) {
    console.error('Error fetching schools:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
