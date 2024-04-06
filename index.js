const http = require('http');
const fs = require('fs');
const { type } = require('os');

const PORT = 9000;


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.url === '/') {
      fs.readFile(`${__dirname}/templates/form.html`, 'utf-8', (err, data) => {
        if (err) return err;

        res.end(data);
      });
    } else if (req.url === '/about') {
      fs.readFile(`${__dirname}/templates/about.html`, 'utf-8', (err, data) => {
        if (err) return err;

        res.end(data);
      });
    } else if (req.url === '/information') {
      fs.readFile(
        `${__dirname}/templates/information.html`,
        'utf-8',
        (err, data) => {
          if (err) return err;

          res.end(data);
        }
      );
    }
  } else if (req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const email = [];
    req.on('data', (data) => {
      email.push(Buffer.from(data));
    });
    req.on('end', () => {
      const message = email.toString().split('=')[1];
      res.end(`Name ${message} added succesfully `);
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
