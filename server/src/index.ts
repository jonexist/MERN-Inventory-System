import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import records from './routes/record';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/record', records);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
