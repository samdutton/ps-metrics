// const cors = require('cors');
const express = require('express');

const app = express();

// Add response header
// app.use(function(req, res, next) {
//   res.setHeader('Foo-Bar', 'Baz');
//   next();
// });

app.use(express.static('public'));
// app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// app.get('/foo', (req, res) => {
//   const requestInfo = {
//     protocol: req.protocol,
//     host: req.host,
//     path: req.path,
//   };
//   console.log('Request', requestInfo);
//   console.log('Headers: ', req.headers);
//   res.json(req.headers);
// });

const listener = app.listen(process.env.PORT, () => {
  console.log(`App is listening: http://localhost:${listener.address().port}`);
});
