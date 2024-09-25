const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvent = async (message, txtFileName) => {
    const dateTime = format(new Date(), 'dd-MM-yyyy  HH-MM-SS')
    const txt = `${dateTime}\t${uuid()}\t${message}\n`
    try{
       if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
       }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', txtFileName), txt)
    } catch(err) {
        console.log(err, 'Log event Error')
    }
}

const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    next()
}

module.exports = { logEvent, logger }
