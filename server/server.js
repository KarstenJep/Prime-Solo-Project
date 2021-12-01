const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const batchRouter = require('./routes/batch.router');
const dailyRouter = require('./routes/daily.router');
const inventoryRouter = require('./routes/inventory.router');
const updateRouter = require('./routes/update.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/batch', batchRouter);
app.use('/api/update', updateRouter);
app.use('/api/daily', dailyRouter);
app.use('/api/inventory', inventoryRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const host = '0.0.0.0';
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, host, () => {
  console.log(`Listening on port: ${PORT}, with host: ${host}`);
});
