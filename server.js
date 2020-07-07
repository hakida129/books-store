var express = require('express');
var bodyParser = require('body-parser');

var bookRouter = require('./routers/books.router');
var userRouter = require('./routers/users.router');
var transactionRouter = require('./routers/transactions.router');

var app = express();

var PORT = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.render('index');
});

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter);

app.listen(PORT, function(){
  console.log(`Server running at http://localhost:${PORT} `);
})  