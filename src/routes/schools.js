// routes/schools.js
import express from 'express';
import db from '../dbConfig/dbConfig.js';

const router = express.Router();

// Haversine formula to calculate distance between 2 coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in KM
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // in km

  return distance;
}

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the School Management API!' });
});

router.get('/listSchools', (req, res) => {
  const { latitude, longitude, page = 1, limit = 5 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const offset = (pageNumber - 1) * limitNumber;

  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Add distance to each school
    const schoolsWithDistance = results.map(school => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
      );
      return { ...school, distance: distance.toFixed(2) }; 
    });

    // Sort by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    const paginated = schoolsWithDistance.slice(offset, offset + limitNumber);

    res.json({
      page: pageNumber,
      limit: limitNumber,
      total: schoolsWithDistance.length,
      results: paginated
    });
  });
});

export default router;
