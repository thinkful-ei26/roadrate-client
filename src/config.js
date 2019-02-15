    module.exports = {
      PORT: process.env.PORT || 8080,
      MONGODB_URI: process.env.MONGODB_URI || 'mongodb://user:password123@ds145694.mlab.com:45694/donna-crafts',
      // TEST_MONGODB_URI: process.env.TEST_MONGODB_URI || 'mongodb://localhost/noteful-test',
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
      API_BASE_URL: 'http://localhost:8080/api'
    };