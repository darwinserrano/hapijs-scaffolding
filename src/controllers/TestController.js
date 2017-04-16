module.exports = class Test {
  constructor() {}

  static list(request, reply) {
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