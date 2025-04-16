const express = require('express')
const playlistController = require('../controller/playlistController')
const app = express()

app.use(express.json())

app.post('/' , (req, res) =>{
    res.json({ message: 'Hello, Wordl!'})
})


app.get('/playlist', playlistController.index)
app.get('/playlist/:id', playlistController.showPlay)
app.get('/playlist/:id/musics', playlistController.showMusics)
app.get('/playlist/:id/musics/:musicID', playlistController.detailsMusic)

app.post("/playlist", playlistController.savePlay)
app.post("/playlist/:id/musics", playlistController.saveMusic)

app.put("/playlist/:id", playlistController.UpDatePlay)

app.delete('/playlist/:id', playlistController.deletePlay)
app.delete('/playlist/:id/musics/:musicID', playlistController.deleteMusic)

const PORT = process.env.PORTS || 3000
app.listen(PORT, () => {console.log('Servidor iniciado!!')}) 