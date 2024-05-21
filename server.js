
require('dotenv').config()
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

// connectDB()//

const cors = require('cors')
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))
app.use(cors())


app.use('/', require('./routes/root'))

app.use('/getCookie', require('./routes/getCookie')) // to get the cookie in your browser rightnow, compare if it exist somewhere in database

app.use('/users', require('./routes/users')) // i sesend sa client buong users Database

app.use('/register', require('./routes/register')) // api pag create new account
app.use('/login', require('./routes/login')) // api pag mag login
app.use('/logout', require('./routes/logout')) // api for log out, clear data base dito


app.use('/addQuiz', require('./routes/quiz'))
app.use('/getScore', require('./routes/getScore'))

app.use(require('./middleware/verifyJWT'))
app.use('/verifiedRoutes', require('./authRoutes/dashRoutes'))



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening to port : ${PORT}`))
