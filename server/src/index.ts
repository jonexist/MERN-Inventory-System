import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import records from './routes/record';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;
const app: express.Application = express();

const corsOptions: cors.CorsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/record', records);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
