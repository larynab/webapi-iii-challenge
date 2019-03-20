const express = require('express');
const helmet = require('helmet');

const baseRouter = require('./data/helpers/base-router.js');

const server = express();

// global middleware
function defender(req, res, next) {
  res.status(404).json("No");
}

function alphaDirector(req, res, next) {
  req.team = 'Web XVII'; 
  next(); 
}

function gateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).send('Access denied!');
  } else {
    next();
  }
}

// server.use(defender);
server.use(express.json());
server.use(helmet());
server.use(alphaDirector);
// server.use(gateKeeper);

// routing
server.use('/api/users', baseRouter);
server.use('/api/posts', baseRouter);

// route handlers ARE middleware
server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

// function restricted(req, res, next) {
//   const password = req.headers.password;

//   if (password === 'password') {
//     next();
//   } else {
//     res.status(401).send('Wrong Password!');
//   }
// }

module.exports = server;