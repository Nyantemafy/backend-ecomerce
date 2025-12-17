const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(cors({
  origin: [
    'https://nyantemafy.github.io',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   HEALTH CHECK
======================= */
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

/* =======================
   MONGODB CONNECTION
   (anti-multiple connections)
======================= */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI)
      .then(mongoose => {
        console.log('✅ MongoDB connected');
        return mongoose;
      })
      .catch(err => {
        console.error('❌ MongoDB error:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* =======================
   DB CONNECTION MIDDLEWARE
======================= */
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

/* =======================
   ROUTES API
======================= */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/payment', require('./routes/payment'));

/* =======================
   ROUTE TEST
======================= */
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'API OK',
    message: 'Backend serverless running on Vercel',
    time: new Date().toISOString()
  });
});

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

/* =======================
   EXPORT (IMPORTANT)
======================= */
module.exports = app;

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}