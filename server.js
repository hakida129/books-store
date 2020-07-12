require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var bookRouter = require('./routers/books.router');
var userRouter = require('./routers/users.router');
var transactionRouter = require('./routers/transactions.router');
var authRouter = require('./routers/auth.router');

var middleware = require('./middleware/countCookie.middleware');
var middlewareAuth = require('./middleware/auth.middleware');

var app = express();

var PORT = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'))

app.get('/',middleware.countCookie, function(req, res){
  console.log(req.cookies.countCookie);
  res.render('index');
});

app.use('/books', middlewareAuth.requireAuth, middleware.countCookie, bookRouter);
app.use('/users', middlewareAuth.requireAuth, middleware.countCookie, userRouter);
app.use('/transactions', middlewareAuth.requireAuth, middleware.countCookie, transactionRouter);
app.use('/auth', authRouter);

app.listen(PORT, function(){
  console.log(`Server running at http://localhost:${PORT} `);
})  