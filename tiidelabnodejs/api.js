// npm packages
let express = require('express')
let bodyParser = require('body-parser')

// exported modules
let userControllers = require('./controllers/userControl')
let taskControllers = require('./controllers/taskControl')

app = express()
app.use(bodyParser.json())

// instantiate controllers
userControllers(app)
taskControllers(app)

app.listen(8000)
console.log('Listening on port 8000')