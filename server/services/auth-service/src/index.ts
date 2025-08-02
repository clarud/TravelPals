import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/', authRoutes);

app.get('/ping', (_, res) => res.send('Auth Service OK'));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
