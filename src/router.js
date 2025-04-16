const express = require('express')
const playlistController = require('../controller/playlistController')

const router = express.Router()

router.get('/playlist', playlistController.index)
router.get('/playlist/:id', playlistController.showPlay)
router.get('/playlist/:id/musics', playlistController.showMusics)
router.get('/playlist/:id/musics/:musicID', playlistController.detailsMusic)

router.post("/playlist", playlistController.savePlay)
router.post("/playlist/:id/musics", playlistController.saveMusic)

router.put("/playlist/:id", playlistController.UpDatePlay)

router.delete('/playlist/:id', playlistController.deletePlay)
router.delete('/playlist/:id/musics/:musicID', playlistController.deleteMusic)

module.exports = router