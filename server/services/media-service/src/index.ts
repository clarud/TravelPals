import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/ping', (_, res) => res.send('Media Service OK'));

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  console.log(`Media service running on port ${PORT}`);
});
