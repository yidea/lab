var redis = require("redis");

//http://redislabs.com/
var redisClient = redis.createClient(
  10440,
  "pub-redis-10440.us-east-1-3.3.ec2.garantiadata.com",
  {
    auth_pass: "andy12"
  }
);

redisClient.set("test1", "hellow3");
redisClient.get("test1", function (err, res) {
  if (err) {
    throw new Error(err);
  }
  console.log(res.toString());
});

redisClient.flushall(); //flush the database and clear all data
