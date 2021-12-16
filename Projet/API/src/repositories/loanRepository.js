const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const checkLoan = function(loan) {
    const requiredFields = ['userId', 'copyId'];
    const missingFields = requiredFields.filter(key => !Object.keys(loan).includes(key));
    if(missingFields){
        throw new ValidationError(
            'The loan is missing required fields : ' + missingFields.join(', ') + '...'
        );
    }
}

class LoanRepository {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return this.db.getData("/loans");
    }

    add(book) {
        checkLoan(book);
        book.id = uuid();
        book.copies = []; // initialize empty copy array
        this.db.push("/loans[]", book);

        return book;
    }

    get(id) {
        const books = this.getAll();
        return _.find(books, { id });
    }

    update(id, loan) {
        if (loan.id !== id) {
            throw new ValidationError('You cannot change the identifier.');
        }

        checkLoan(loan);
        const path = this.getIdPath(id);
        if (path == null) {
            throw new ValidationError('This loan does not exists');
        }

        this.db.push(path, loan);

        return loan;
    }

    delete(id) {
        const path = this.getIdPath(id);
        if (path != null) {
            this.db.delete(path);
        }
        
    }

    getIdPath(id) {
        const loans = this.getAll();
        const index = _.findIndex(loans, { id });
        if (index === -1) {
            return null;
        }

        return '/loans[' + index + ']';
    }
}

module.exports = LoanRepository;