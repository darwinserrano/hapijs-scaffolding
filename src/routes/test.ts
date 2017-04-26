import Test from '../controllers/TestController';

export default [{
  path: '/test1',
  method: 'GET',
  config: {
    auth: 'jwt'
  },
  handler: Test.list
}];