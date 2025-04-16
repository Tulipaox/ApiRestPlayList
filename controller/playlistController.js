let playLists = [
    { id: 1, name: "braba", tags: ["melancólica"], musicas: [{ id: 1, title: "Skyfall", ano: 2020, artista: "Adele", album: "Skyfall" }, 
        { id: 2, title: "Skyfall", ano: 2020, artista: "Adele", album: "Skyfall" }] },
    { id: 2, name: "ox", tags: ["R&B"], musicas: [{ id: 2, title: "White Ferrari", ano: 2015, artista: "Frank Ocean", album: "Blonde" }] },
    { id: 3, name: "trap", tags: ["melancólica"], musicas: [{ id: 3, title: "Chest Pain", ano: 2020, artista: "Malcolm Todd", album: "Malcolm Todd" }] }
]


module.exports = {
    // GET /playlist
    index: (req, res) =>{
        res.json(playLists)
    },

    // GET /playlist/:id
    showPlay: (req, res) =>{
        const { id } = req.params

        const playList = playLists.find(play => play.id === +id)
        
        if(!playLists) {
            res.json({ message: "Play List not found!"})
        } else{
            res.json(playList)
        }
    },

    // GET /playlist/:id/musicAll
    showMusics: (req, res) =>{
        const { id } = req.params

        const playList = playLists.find(play => play.id === +id)
        
        if(!playLists) {
            res.json({ message: "Play List not found!"})
        } else{
            res.json(playList.musicas)
        }
    },

    // GET /playlist/:id/music/:id
    detailsMusic: (req, res) =>{
        const { id, musicID } = req.params

        const playList = playLists.find(play => play.id === +id)
        const music = playList.musicas.find(music => music.id === +musicID)
        if(!playLists) {
            res.json({ message: "Play List not found!"})
        } else{
            res.json(music)
        }
    },
    // POST /playlist
    savePlay: (req, res) =>{
        const { name, tags, musicas, title, ano, artista, album } = req.body

        const newPlay = {
            id: Math.floor(Math.random() * 9999999),
            name,
            tags,
            musicas,
            title,
            ano,
            artista, 
            album
        }

        playLists.push(newPlay)
        res.status(201)
        res.json(newPlay)
    },
    // POST /playlist/:id/music/
    saveMusic: (req, res) =>{
        const { title, ano, artista, album } = req.body
        const { id } = req.params

        const newMusic = {
            id: Math.floor(Math.random() * 9999999),
            title,
            ano,
            artista, 
            album
        }

        const playList = playLists.find(play => play.id === +id) 

        if(!playList) {
            res.json({ message: "PlayList not found!"})
        } else {
            playList.musicas.push(newMusic)
        }
        
        res.status(201)
        res.json(newMusic)
    },
    // PUT /playlist/:id  encontrar o item substituir o name e as tags usando o metado findindex para encontrar o index e subsituir o name e mesma coisa nas tags
    // const playIndex - playlist.findIndex(play => play.id === +id)
       // playlist[playIndex].name = name
       // playlist[playIndex].tags.splice(0, tag)


    UpDatePlay: (req, res) =>{
        const { name, tags } = req.body
        const { id } = req.params

        const playIndex = playLists.findIndex(play => play.id === +id)

        if(playIndex === -1) {
            res.json({ message: "PlayList not found!"})
            res.status(404)
        } 

        if(typeof name !== "string" && typeof tags !== "string") {
           return res.status(400).json({ message: "Format Invalid!"})
        } 
        
        playLists[playIndex].name = name
        playLists[playIndex].tags.splice(0, 1, tags)

        res.status(200)
        res.json(playLists[playIndex])
    },
    // DELETE /playlist/:id
    deletePlay: (req, res) =>{
        const { id } = req.params

        const playIndex = playLists.findIndex(play => play.id === +id)
        if(playIndex === -1) {
            res.json({ message: "PlayList not found!"})
            res.status(404)     
        }
        
        playLists.splice(playIndex, 1)
        
        res.status(204).end()
       },
    // DELETE /playlist/:id/musica/:musicID

    deleteMusic: (req, res) =>{
        const { id, musicID } = req.params

        const playList = playLists.find(play => play.id === +id)
        const musicIndex = playList.musicas.findIndex(music => music.id === +musicID)
        

        if(!playList){
            res.json({ message: "PLay List not found!"})
            res.status(404) 
        }

        if(musicIndex === -1) {
            res.json({ message: "Music not found!"})
            res.status(404)     
        }

        playList.musicas.splice(musicIndex, 1)

        res.status(204).end()
       }
}