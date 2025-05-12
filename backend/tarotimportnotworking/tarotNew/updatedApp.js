// require('dotenv').config()
const express = require('express')
const cors = require('cors')
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const adminRoutes = require('./routes/admin.routes')
const loginRoutes = require('./routes/auth.routes')
const participantRoutes = require('./routes/participant.routes')
const transactionRoutes = require('./routes/transaction.routes')
const stripeRoutes = require('./routes/stripe.routes')
const emailRoutes = require('./routes/email.routes')

const tarotRoutes = require('./tarot/tarot.routes');

// const path = require('path'); // requires explanation. added for rendering front page subpages

const app = express()



app.use(cors())
// app.use(cors({
//   origin: 'http://localhost:5173', // Your Vite frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true // If using cookies/sessions
// }))
app.use(express.json());

app.use((req, res, next) => {
  console.log("Request reached Express!");
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use('/api/admin', adminRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/participant', participantRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/stripe', stripeRoutes)
app.use('/api/email', emailRoutes)
app.use('/api/tarot', tarotRoutes);

app.use(express.static('dist')) 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get('/*', (req, res, next) => {
//   if (req.path.startsWith('/api')) {
//     return next(); // let the API routes handle it
//   }

//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

module.exports = app