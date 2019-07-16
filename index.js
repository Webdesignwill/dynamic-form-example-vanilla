const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const routes = require('./server/routes')
const mongoose = require('mongoose')
const config = require('./config')[process.env.NODE_ENV]

const app = express()
const db = mongoose.connect(config.db, {
  useNewUrlParser: true
});

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', routes)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
