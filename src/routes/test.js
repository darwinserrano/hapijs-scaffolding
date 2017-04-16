const Test = require('../controllers/TestController')

module.exports = [{
  path: '/test1',
  method: 'GET',
  config: {
    auth: 'jwt'
  },
  handler: Test.list
}]