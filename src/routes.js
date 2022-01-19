const {
  addBooksHandler, getBooksHandler, getDetailBooksHandler, editBooksHandler, deleteBooksHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getDetailBooksHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooksHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksHandler,
  },

  {
    method: 'post',
    path: '/login',
    handler: (request, h) => {
      const { username, password } = request.payload;
      if (username === 'admin' && password === 'admin') {
        return h.response({
          statusCode: 200,
          message: 'Login Success',
        });
      }
      return h.response({
        statusCode: 401,
        message: 'Login Failed',
      });
    },

  }
];

module.exports = routes;
