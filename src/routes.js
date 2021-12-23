const {addBooksHandler, getBooksHandler} = require("./handler");
const routes = [
    {
        method: "POST",
        path: "/books",
        handler: addBooksHandler,
    },
    {
        method: "GET",
        path: "/books",
        handler: getBooksHandler
    }
]

module.exports = routes;