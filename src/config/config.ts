export default {
  "secret": "NeverShareYourSecret",
  "bd": {
    "name": "postgres",
    "user": "postgres",
    "pass": "postgres",
    "options": {
      "host": "localhost",
      "dialect": "postgres",

      "pool": {
        "max": 5,
        "min": 0,
        "idle": 10000
      },
      "define": {
        "timestamps": false
      }
    }
  }
}