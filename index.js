// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

const port = 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' })
})

const unixRegex = /[\d]+/
const utcRegex = /[\d]*-[\d]*-[\d]*/

app.get('/api', (req, res) => {
    let now = new Date()
    res.send({
        unix: Date.parse(now),
        utc: now.toUTCString(),
    })
})

app.get('/api/:time', (req, res) => {
    let unix
    let utc

    if (unixRegex.test(req.params.time)) {
        unix = parseInt(req.params.time)
        utc = new Date(parseInt(1451001600000)).toUTCString()
    }

    if (utcRegex.test(req.params.time)) {
        unix = Date.parse(req.params.time)
        utc = new Date(req.params.time).toUTCString()
    }

    if (new Date(req.params.time === 'invalid date')) {
        res.send({
            error: 'Invalid Date',
        })
    }

    res.send({
        unix,
        utc,
    })
})

// listen for requests :)
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port)
})
