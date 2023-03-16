const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const path = require('path');
const app = express();
const Auth = require('./middleware/auth');

require('./database/connection');

const accounts = require('./routes/accounts');
const campgrounds = require('./routes/campgrounds');
const misc = require('./routes/misc');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views/pages'),
  path.join(__dirname, 'views')
]);

app.use('/', misc);
app.use('/campgrounds', campgrounds);
app.use('/accounts', accounts);

app.listen(3000, () => {
});