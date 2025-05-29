import express from 'express';
import dotenv from 'dotenv';
import addSchoolRoutes from './routes/addSchool.js'; // note corrected filename
import schoolRoutes from './routes/schools.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the School Management API Base URL!' });
});

// List schools: GET /api/schools
// Add school: POST /api/schools
app.use('/api/schools', schoolRoutes);
app.use('/api/addSchools', addSchoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
