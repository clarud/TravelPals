import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.get('/ping', (_, res) => res.send('Trip Service OK'));

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Trip service running on port ${PORT}`);
});
