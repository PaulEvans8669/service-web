const ValidationError = require("./validationError");
const {v4: uuid} = require("uuid");
const _ = require("lodash");

const getDate = function() {
    const date = new Date();
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

class CopyRepository {
    constructor(db, bookRepository) {
        this.db = db;
        this.bookRepository = bookRepository;
    }

    /**
     * @private
     *
     * @param bookId
     * @return {*|string}
     */
    getBook(bookId) {
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists')
        }
        return bookPath;
    }

    getAll(bookId) {
        const bookPath = this.getBook(bookId);
        return this.db.getData(bookPath + '/copies');
    }

    add(bookId, copy) {
        const bookPath = this.getBook(bookId);
        copy.id = uuid();
        copy.submissionDate ||= getDate()
        this.db.push(`${bookPath}/copies[]`, copy);

        return copy;
    }

    getBookForCopy(id) {
        const copyExists =
            this.bookRepository.getAll()
                .reduce((acc, book) =>
                        acc || book.copies.some(copy => copy.id === id)
                    , false)
        if(!copyExists){
            throw new ValidationError('This book copy does not exist')
        }
        return this.bookRepository.getAll()
            .find(book => book.copies.map(copy => copy.id).includes(id));
    }

    get(bookId, id) {
        const copies = this.getAll(bookId);
        return _.find(copies, { id });
    }

    update(bookId, id, copy) {
        if (copy.id !== id) {
            throw new ValidationError('You cannot change the identifier.');
        }

        const path = this.getIdPath(bookId, id);
        if (path == null) {
            throw new ValidationError('This copy does not exists');
        }

        this.db.push(path, copy);

        return copy;
    }

    delete(bookId, id) {
        const path = this.getIdPath(bookId, id);
        if (path != null) {
            this.db.delete(path);
        }

    }

    getIdPath(bookId, id) {
        const copies = this.getAll(bookId);
        const index = _.findIndex(copies, { id });
        if (index == -1) {
            return null;
        }

        const bookPath = this.getBook(bookId);
        return bookPath +'/copies[' + index + ']';
    }
}

module.exports = CopyRepository;
