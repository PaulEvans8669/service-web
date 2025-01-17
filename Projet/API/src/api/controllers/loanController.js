class LoanController {
    constructor(loanRepository) {
        this.loanRepository = loanRepository;
    }

    getAll(req, res) {
        res.json(this.loanRepository.getAll());
    }

    create(req, res) {
        const loan = this.loanRepository.add(req.body);
        res.location('/loans/' + loan.id);
        res.status(201).send(loan);
    }

    get(req, res) {
        const loan = this.loanRepository.get(req.params.loanId);
        if (loan == null) {
            res.status(404).send(null);
        } else {
            res.status(200).send(loan);
        }
    }

    update(req, res) {
        res.status(200)
            .send(this.loanRepository.update(req.params.loanId, req.body));
    }

    delete(req, res) {
        this.loanRepository.delete(req.params.loanId);
        res.status(204).send(null);
    }
}

module.exports = LoanController;
