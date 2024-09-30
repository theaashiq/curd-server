const whiteList = [
    'https://www.google.com',
    'http://127.0.0.1:5400',
    'http://localhost:5600',
    'http://localhost:5173',
    'https://curd-view-main.vercel.app',
    'https://curd-view-main-n9m8z5pqc-theaashiqs-projects.vercel.app'
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