import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index';
import compression from 'compression';
import helmet from 'helmet';

const app = express();
const port = 4040;

// compress all routes
app.use(compression());

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// secure apps by setting various HTTP headers
app.use(helmet());

app.use('/api', apiRoutes);

app.listen(process.env.port || port, () => {
  console.log(`Now listening on ${port}`);
});