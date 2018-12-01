var express = require('express');
var router = express.Router();
const dataHandler = require('../services/namara').getOverallData
const getScore = require('../managers/area-score')
const { Client } = require('pg');

var isLoggedIn = false;

const client = new Client({
  user: 'ywvbcipwxxbeiy',
  host: 'ec2-50-17-203-51.compute-1.amazonaws.com',
  database: 'd7at59lqe2rt1u',
  password: '59d9060a61cf0a78f3695d2c402eaf68e2d3f09799458ba44b6dc8d8e9dbdd6f',
  port: 5432,
  ssl: true

})
client.connect()

router.get('/signup', function(req, res, next) {
  var query = req.query;
  client.query('INSERT INTO public.user (name,age,gender,vehicle) VALUES ($1, $2, $3, $4)', [query.name, query.age, query.gender, query.vehicle]);
  res.send('received');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if (isLoggedIn) {
    isLoggedIn = false;
    res.send({signup: false})
  } else {
    isLoggedIn = true;
    res.send({signup: true})
  }
});


router.get('/dangerLevel/lat/:latitude/lon/:longitude', async (req, res, next) => {

    const {latitude, longitude} = req.params

    const level = await getScore(latitude, longitude)
    res.send(level)
})

module.exports = router;
