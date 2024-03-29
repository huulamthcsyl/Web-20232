import express from 'express';
import cors from 'cors';
import config from './config.js';
import route from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route init
route(app);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);