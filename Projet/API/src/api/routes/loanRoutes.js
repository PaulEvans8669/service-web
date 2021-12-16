module.exports = function(app, loanController) {
    app.route('/books')
        .get(loanController.getAll.bind(loanController))
        .post(loanController.create.bind(loanController));
    
    app.route('/books/:bookId')
        .get(loanController.get.bind(loanController))
        .put(loanController.update.bind(loanController))
        .delete(loanController.delete.bind(loanController));
}