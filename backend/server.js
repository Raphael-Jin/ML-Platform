const { v4: uuidv4 } = require('uuid');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // generate a new id and write it to the SQLite DB
  new_id = uuidv4();
  res.end(new_id);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});