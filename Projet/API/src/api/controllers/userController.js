class UserController {
    constructor(userRepository, loanRepository) {
        this.userRepository = userRepository;
        this.loanRepository = loanRepository;
    }

    getAll(req, res) {
        res.json(this.userRepository.getAll());
    }

    create(req, res) {
        const user = this.userRepository.add(req.body);
        res.location('/users/' + user.id);
        res.status(201).send(user);
    }

    get(req, res) {
        const user = this.userRepository.get(req.params.userId);
        if (user == null) {
            res.status(404).send(null);
        } else {
            res.status(200).send(user);
        }
    }

    getLoansForUser(req, res) {
        res.json(this.loanRepository.getLoansForUser(req.params.userId));
    }

    update(req, res) {
        res.status(200)
            .send(this.userRepository.update(req.params.userId, req.body));
    }

    delete(req, res) {
        this.loanRepository.deleteLoansForUser(req.params.userId)
        this.userRepository.delete(req.params.userId);
        res.status(204).send(null);
    }
}

module.exports = UserController;
