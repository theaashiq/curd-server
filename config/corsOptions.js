const whiteList = [
    'http://www.google.com',
    'http://127.0.0.1:5600',
    'http://localhost:5600'
]

const corsOptions = {
    origin: function (origin, callback) {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
}

module.exports = corsOptions