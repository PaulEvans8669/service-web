class BookController {
    constructor(bookRepository, loanRepository) {
        this.bookRepository = bookRepository;
        this.loanRepository = loanRepository;
    }

    getAll(req, res) {
        res.json(this.bookRepository.getAll());
    }

    create(req, res) {
        const book = this.bookRepository.add(req.body);
        res.location('/books/' + book.id);
        res.status(201).send(book);
    }

    get(req, res) {
        const book = this.bookRepository.get(req.params.bookId);
        if (book == null) {
            res.status(404).send(null);
        } else {
            res.status(200).send(book);
        }
    }

    getAvailableCopies(req, res) {
        res.json(this.loanRepository.getAvailableCopies(req.params.bookId));
    }

    update(req, res) {
        res.status(200)
            .send(this.bookRepository.update(req.params.bookId, req.body));
    }

    delete(req, res) {
        this.bookRepository.delete(req.params.bookId);
        res.status(204).send(null);
    }
}

module.exports = BookController;
