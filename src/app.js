import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';

// configuration
const app = express();
const port = process.env.PORT || 4040;

// compress all routes
app.use(compression());

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// generate log files for all user requests
app.use(morgan("common"));

// secure apps by setting various HTTP headers
app.use(helmet());

app.use('/api', apiRoutes);

module.exports = app.listen(process.env.port || port, () => {
  console.log(`Now listening on ${port}`);
});

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});