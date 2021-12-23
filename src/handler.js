const {nanoid} = require("nanoid");
const books = require("./books.js");

const addBooksHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished =  (pageCount === readPage);
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if(name === undefined) {
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        }).code(400);
    }

    if(readPage > pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400);
    }

    if(isSuccess){
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
}

const getBooksHandler = (request, h) => {
    const {name, reading, finished} = request.query;

    let filterBooks = books;

    if(name !== undefined) {
        filterBooks = filterBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if(reading !== undefined) {
        filterBooks = filterBooks.filter((book) => book.reading === !!Number(reading));
    }

    if(finished !== undefined) {
        filterBooks = filterBooks.filter((book) => book.finished === !!Number(finished));
    }

    const response = h.response({
        status: 'success',
        data: {
            books: filterBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);

    return response;
}

const getDetailBooksHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
};

const editBooksHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        if(name === undefined) {
            return h.response({
                status: "fail",
                message: "Gagal memperbarui buku. Mohon isi nama buku",
            }).code(400);
        }
    }

    if (pageCount < readPage) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400);
    }

    if(index !== -11) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diubah',
        });
        response.code(200);
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;

};

const deleteBooksHandler = (request, h) => {
    const { id } = request.params;

    const book = books.findIndex((b) => b.id === id);

    if(book !== -1) {
        books.splice(book, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};


module.exports = {
    addBooksHandler,getBooksHandler, getDetailBooksHandler,editBooksHandler,deleteBooksHandler
};