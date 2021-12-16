class CopyController {
    constructor(copyRepository) {
        this.copyRepository = copyRepository;
    }

    getAll(req, res) {
        res.json(this.copyRepository.getAll(req.params.bookId));
    }

    create(req, res) {
        const copies = this.copyRepository.add(req.params.bookId, req.body);
        res.location('/copies/' + copies.id);
        res.status(201).send(copies);
    }

    get(req, res) {
        const copy = this.copyRepository.get(req.params.bookId, req.params.copyId);
        if (copy == null) {
            res.status(404).send(null);
        } else {
            res.status(200).send(copy);
        }
    }


    getBookForCopy(req, res) {
        res.json(this.copyRepository.getBookForCopy(req.params.copyId));
    }

    update(req, res) {
        res.status(200)
            .send(this.copyRepository.update(req.params.bookId, req.params.copyId, req.body));
    }

    delete(req, res) {
        this.copyRepository.delete(req.params.bookId, req.params.copyId);
        res.status(204).send(null);
    }
}

module.exports = CopyController;
