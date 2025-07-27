import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/ping', (_, res) => res.send('Social Service OK'));

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`Social service running on port ${PORT}`);
});
