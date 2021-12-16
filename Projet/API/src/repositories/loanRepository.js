const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const getDate = function() {
    const date = new Date();
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

const checkLoan = function(loan) {
    const requiredFields = ['userId', 'copyId'];
    const missingFields = requiredFields.filter(key => !Object.keys(loan).includes(key));
    if(missingFields.length){
        throw new ValidationError(
            'The loan is missing required fields : ' + missingFields.join(', ') + '...'
        );
    }
}

class LoanRepository {
    constructor(db, userRepository, bookRepository) {
        this.db = db;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    checkAvailability(loan) {
        const copyExists =
            this.bookRepository.getAll()
                .reduce((acc, book) =>
                    acc || book.copies.some(copy => copy.id === loan.copyId)
                    , false)

        const isAlreadyLoaned = this.getAll().some(_loan => _loan.copyId  === loan.copyId);

        if(!copyExists){
            throw new ValidationError('This book copy does not exist')
        }
        if(isAlreadyLoaned){
            throw new ValidationError('This book copy is already loaned')
        }
    }

    getAll() {
        return this.db.getData("/loans");
    }

    getAvailableCopies(bookId) {
        const loansId = this.getAll().map(({copyId}) => copyId);
        return this.bookRepository.get(bookId).copies
            .filter(copy => !loansId.includes(copy.id))
    }

    getLoansForUser(userId) {
        return this.getAll().filter((loan) => loan.userId === userId)
    }

    add(loan) {
        checkLoan(loan);
        this.userRepository.checkUserExistence(loan.userId);
        this.checkAvailability(loan);
        loan.id = uuid();
        loan.loanDate ||= getDate()
        this.db.push("/loans[]", loan);

        return loan;
    }

    get(id) {
        const loans = this.getAll();
        return _.find(loans, { id });
    }

    delete(id) {
        const path = this.getIdPath(id);
        if (path != null) {
            this.db.delete(path);
        }
    }

    deleteLoansForUser(userId) {
        this.getLoansForUser(userId).forEach((loan) => {
            this.delete(loan.id)
        })
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
