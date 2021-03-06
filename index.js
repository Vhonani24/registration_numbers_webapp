const express = require('express');

const app = express();

const pg = require('pg');

const { Pool } = pg;

const cookieParser = require('cookie-parser');

const session = require('express-session');

const flash = require('express-flash');

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  // eslint-disable-next-line no-unused-vars
  useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://vhonani:vhonani123@localhost:5432/registrations';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const sessionStore = new session.MemoryStore();

const exphbs = require('express-handlebars');

const Registrations = require('./registration_number');

const registrations = Registrations(pool);

const getRoutes = require('./routes');

const routes = getRoutes(registrations);

app.engine('handlebars', exphbs({ layoutsDir: 'views/layouts/' }));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser('secret'));

app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret',
}));
app.use(flash());

app.get('/', routes.home);

app.get('/filter', routes.getFilter);

app.post('/filter', routes.postFilter);

app.post('/reg_numbers', routes.postData);

app.post('/reset', routes.resetData);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('App started at port:', PORT);
});
