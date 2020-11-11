var Stripe = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.DB_SECRET_KEY);

var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
var port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var fs = require("fs");
var express = require("express");
var router = express.Router();

const okHosts = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (okHosts.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

app.use(cors(corsOptions));
// Start the server
app.listen(port, function (err) {
  if (err) {

  } else {

  }
});

// const http = require('http');

// const hostname = '127.0.0.1';

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Node API is running!!');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


console.log('server running');

// Stripe
app.post('/api/charge', async function (req, res) {
  const { id, amount } = req.body;
  console.log(req.body);

  const payment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "USD",
    description: "Monthly Subscription",
    payment_method: id,
    confirm: true,
  });
  console.log(payment);

  return res.status(200).json({
    confirm: "Payment received",
  });

});

module.exports = router;

app.get("/", (req, res) => {
  res.send("hello world!")
})
