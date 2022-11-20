import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './server/config';
import routes from './server/routes';
import mongoose from 'mongoose';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', routes);

/* Mongo Connection */
mongoose.connect(config.dbUri, {}, (err) => {
    if (err) {
        console.log('Error connecting to database', err);
    } else {
        console.log('Connected to database');
    }
});


app.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});
