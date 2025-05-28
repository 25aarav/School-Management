// server.js
import express from 'express';
import dotenv from 'dotenv';
import addSchoolRoutes from './routes/addSchoolRoutes.js'
import schoolRoutes from './routes/schools.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the School Management API Base URL!' });
});
app.use('/api', schoolRoutes);
app.use('/api/addSchool' , addSchoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
