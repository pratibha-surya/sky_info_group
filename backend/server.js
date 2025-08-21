import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import categoryRoute from './routes/category.route.js';
import subcategoryRoute from './routes/subcategory.route.js';
import productRoute from './routes/product.route.js';
import { connectDB } from './config.js/db.js';

dotenv.config();
connectDB();

const app = express();


app.use(express.json());

const allowedOrigins = [
  'https://sky-info-group.onrender.com', 
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use('/api/v1/', categoryRoute);
app.use('/api/v1/', subcategoryRoute);
app.use('/api/v1/', productRoute);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../frontend/dist')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


