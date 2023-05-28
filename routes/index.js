const express = require('express') // may need to add .Router() ???
const db = require('../db/db.json')
const fs = require('fs')

const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

const app = express()

app.get('/notes', (req, res) => {
    let userAgent = req.rawHeaders[req.rawHeaders.indexOf('User-Agent')+1]
    console.log(`${req.method} request recieved from ${userAgent}`)

    res.json(db)
})

app.post('/notes', (req, res) => {
    let userAgent = req.rawHeaders[req.rawHeaders.indexOf('User-Agent')+1]
    console.log(`${req.method} request recieved from ${userAgent}`)

    const {title, text} = req.body

    if (title && text) {
        const newNote = {
            title,
            text,
            noteId: uuid()
        }

        const response = {
            status: 'success',
            body: newNote
        }

        db.push(newNote)

        fs.writeFile('./db/db.json',JSON.stringify(db,null,4), (err) => {
            err? console.error(err) : console.info('successfully wrote to file')
        })

        res.json(response)

    } else {
        res.json('Error in adding note')
    }
})

app.delete('/notes/:id', (req,res) => {
    let index = 0    
    db.forEach((entry,i) => {
        if (entry.noteId === req.params.id) {
            index = i
        }
    })

    db.splice(index, 1)

    fs.writeFile('./db/db.json',JSON.stringify(db,null,4), (err) => {
        if (err) {
            console.error(err)
        } else {
            console.info('successfully deleted note')

            const response = {
                status: 'success',
            }

            res.json()
        } 
    })




})


module.exports = app