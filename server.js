var express = require('express');
var bodyParser = require('body-parser');

var bookRouter = require('./routers/books.router');
var userRouter = require('./routers/users.router');
var transactionRouter = require('./routers/transactions.router');

var middleware = require('./middleware/countCookie.middleware');

var app = express();

var PORT = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/',middleware.countCookie, function(req, res){
  res.render('index');
});

app.use('/books',middleware.countCookie, bookRouter);
app.use('/users',middleware.countCookie, userRouter);
app.use('/transactions',middleware.countCookie, transactionRouter);

app.listen(PORT, function(){
  console.log(`Server running at http://localhost:${PORT} `);
})  