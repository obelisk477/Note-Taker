const express = require('express')
const path = require('path');
const api = require('./routes/index')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/api', api)

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// May need to fix app URL here, used process.env for heroku
app.listen(PORT, () => {
    console.log(`Notes app listening at http://localhost:${PORT}`)
})