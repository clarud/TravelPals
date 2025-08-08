import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev port
    'http://localhost:4173', // Vite preview
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/auth', proxy('http://localhost:4001'));
app.use('/user', proxy('http://localhost:4002'));
app.use('/trip', proxy('http://localhost:4003'));
app.use('/social', proxy('http://localhost:4004'));
app.use('/media', proxy('http://localhost:4005'));

app.listen(process.env.PORT, () => console.log(`API Gateway running on port ${process.env.PORT}`));
