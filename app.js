import express from 'express';

const app = express();
const port = 4040;

app.get('/', () => {
  console.log('GET request');
});

app.listen(process.env.port || port, () => {
  console.log(`Now listening on ${port}`);
});