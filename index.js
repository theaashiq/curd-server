const express = require('express')
const path = require('path')
const cors = require('cors')

const { logger } = require('./middleware/logEvents');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandling');
const connectDB = require('./config/dbConfig');
// const { logger } = require(path.join(__dirname, 'middleware', 'logEvents'))
// const corsOptions = require(path.join(__dirname, 'config', 'corsOptions'))
// const errorHandler = require(path.join(__dirname, 'middleware', 'errorHandling'))
// const connectDB = require('./config/dbConfig')

const PORT = process.env.PORT || 5600

const app = express()

app.use(logger)

app.use(cors(corsOptions));  

app.use(express.urlencoded({extended: false}))
app.use(express.json())

// app.use('/', require(path.join(__dirname, 'routes', 'mainRoutes')))
app.use('/', require('./routes/mainRoutes'))

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.type('txt').send("404 Not Found")
    } else if(req.accepts('json')) {
        res.json({'error':'404 Not Found'})
    } else {
        res.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

connectDB()
    .then((res) => {
        app.listen(PORT, () => {
            console.log('Sever running in port ', PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    }) 

// app.listen(PORT, () => {
    
//     console.log('Sever running in port ', PORT)
// })
