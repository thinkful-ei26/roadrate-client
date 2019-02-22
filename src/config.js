module.exports = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://jordan:haddadi@roadrate-shard-00-00-qquzy.mongodb.net:27017,roadrate-shard-00-01-qquzy.mongodb.net:27017,roadrate-shard-00-02-qquzy.mongodb.net:27017/roadrate?ssl=true&replicaSet=RoadRate-shard-0&authSource=admin&retryWrites=true',
  // TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/noteful-test',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
  API_BASE_URL: process.env.API_URL || 'https://road-rate-server.herokuapp.com/api'
};