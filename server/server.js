import 'dotenv/config';
import app from './app.js';
import { connectDB } from '#config/db';

const PORT = process.env.PORT || 5000;

connectDB().catch((err) => {
  console.error('MongoDB connection failed:', err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
