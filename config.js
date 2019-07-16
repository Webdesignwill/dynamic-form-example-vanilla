const path = require('path')
const rootPath = path.normalize(__dirname + '/..')

module.exports = {
  development : {
    db : 'mongodb://127.0.0.1:27017/cars',
    root : rootPath
  },
  production : {
    db : process.env.MONGODB_URI,
    root : rootPath
  }
};
