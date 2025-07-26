import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/ping', (_, res) => res.send('User Service OK'));

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
