const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const {handleRegister} = require ('./controllers/register.js')
const { handleSignin } = require('./controllers/signin.js')
const { handleProfile } = require('./controllers/profile.js')
const { handleImage } = require('./controllers/image.js')
const { handleApiCall } = require('./controllers/image.js')

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
        },
    }
  });

const app = express();
app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
          id:'1233',
          name:'John',
          email: 'john@gmail.com',
          password: 'cookies',
          entries:0,
          joined: new Date()  
        },
        {
            id:'1234',
            name:'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries:0,
            joined: new Date()  
          }
    ]
}

app.get('/', (req, res) => {
    res.send('Deployment worked!');
});

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT }`);
})

//     "email": "joey3@gmail.com",
//     "password": "joey3"