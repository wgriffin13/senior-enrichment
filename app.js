const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');
const { syncAndSeed } = require('./db/index.js');

app.use(volleyball)

app.use(express.json())

app.use('/api', require('./api'))

app.use(express.static(path.join(__dirname, '.', 'public')))

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

const PORT = process.env.PORT || 3000
const host = '0.0.0.0'

syncAndSeed()
    .then(() => {
        app.listen(PORT, host, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    })
