// Import des librairies
const express = require('express');
const cors = require('cors');
const { JsonDB } = require('node-json-db');
const bodyParser = require('body-parser');

// Import de nos objets
const bookRoutes = require('./api/routes/bookRoutes');
const copyRoutes = require('./api/routes/copyRoutes');
const loanRoutes = require('./api/routes/loanRoutes');
const userRoutes = require('./api/routes/userRoutes');

const BookController = require('./api/controllers/bookController');
const CopyController = require('./api/controllers/copyController');
const LoanController = require('./api/controllers/loanController');
const UserController = require('./api/controllers/userController');

const BookRepository = require('./repositories/bookRepository');
const CopyRepository = require('./repositories/copyRepository');
const LoanRepository = require('./repositories/loanRepository');
const UserRepository = require('./repositories/userRepository');

// Création de nos objets
const db = new JsonDB("./data/library", true, true);
const bookRepository = new BookRepository(db);
const copyRepository = new CopyRepository(db, bookRepository);
const userRepository = new UserRepository(db);
const loanRepository = new LoanRepository(db, userRepository, bookRepository);

const bookController = new BookController(bookRepository, loanRepository);
const copyController = new CopyController(copyRepository);
const userController = new UserController(userRepository, loanRepository);
const loanController = new LoanController(loanRepository);

// Création du serveur
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuration des routes
bookRoutes(app, bookController);
copyRoutes(app, copyController);
userRoutes(app, userController);
loanRoutes(app, loanController);


function errorHandler(err, req, res, _) {
    console.error(err);
    if (err.isClientError) {
        res.status(403).send({ message: err.message });
    }
    else {
        res.status(500).send({ message: 'Something went wrong' });
    }
}
app.use(errorHandler);
// Démarrage du serveur
app.listen(3000);
console.log('Library API started on port: 3000.');

