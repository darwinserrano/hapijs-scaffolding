const authentication = (decoded, request, callback) => {
  const data = () => {
    return { // our "users database"
      1: {
        id: 1,
        name: 'Jen Jones'
      }
    };
  }

  // do your checks to see if the person is valid
  if (!data()[decoded.id]) {
    return callback(null, false);
  } else {
    return callback(null, true);
  }
}

export = authentication;