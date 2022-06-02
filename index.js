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

app.get('/api', (req, res) => {
    let now = new Date()
    res.send({
        unix: Date.parse(now),
        utc: now.toUTCString(),
    })
})

const regex = /[^\d]/

app.get('/api/:time', (req, res) => {
    let input = req.params.time
    let unix
    let utc

    if (!regex.test(input)) {
        input = new Date(parseInt(input))
        if (input != 'Invalid Date') {
            unix = Date.parse(input)
            utc = input.toUTCString()
            res.send({
                unix,
                utc,
            })
        } else {
            res.send({
                date: 'Invalid Date',
            })
        }
    }

    if (regex.test(input)) {
        input = new Date(input)
        if (input != 'Invalid Date') {
            unix = Date.parse(input)
            utc = input.toUTCString()
            res.send({
                unix,
                utc,
            })
        } else {
            res.send({
                error: 'Invalid Date',
            })
        }
    }
})

// listen for requests :)
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port)
})
