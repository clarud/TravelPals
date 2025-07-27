import express from 'express';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


app.use('/auth', proxy('http://localhost:4001'));
app.use('/user', proxy('http://localhost:4002'));
app.use('/trip', proxy('http://localhost:4003'));
app.use('/social', proxy('http://localhost:4004'));
app.use('/media', proxy('http://localhost:4005'));

app.listen(process.env.PORT, () => console.log(`API Gateway running on port ${process.env.PORT}`));
