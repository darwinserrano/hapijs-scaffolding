import * as Hapi from 'hapi';

export default class Test {
  constructor() { }

  static list(request: Hapi.Request, reply: Hapi.IReply) {
    reply([
      'Hola',
      'Hola',
      'Hola',
      'Hola',
      'Hola',
      'Hola',
      'Hola',
      'Hola'
    ])
      .header("Authorization", request.headers.authorization);
  }
}