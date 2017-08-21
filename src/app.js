import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index';

const app = express();
const port = 4040;

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(process.env.port || port, () => {
  console.log(`Now listening on ${port}`);
});