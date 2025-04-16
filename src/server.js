const express = require('express')
const playlistController = require('../controller/playlistController')
const router = require('./router')

const app = express()

app.use(express.json())

app.post('/' , (req, res) =>{
    res.json({ message: 'Hello, Wordl!'})
})

app.use("/", router)

const PORT = process.env.PORTS || 3000
app.listen(PORT, () => {console.log('Servidor iniciado!!')}) 