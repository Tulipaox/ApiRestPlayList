let playLists = []

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

    // GET /playlist/:id/musicAll todas as musicas 
    showMusics: (req, res) =>{
        const { id } = req.params

        const playList = playLists.find(play => play.id === +id)
        
        if(!playLists) {
            res.json({ message: "Play List not found!"})
        } else{
            res.json(playList.musicas)
        }
    },

    // GET /playlist/:id/music/:id acha uma musica 
    detailsMusic: (req, res) =>{
        const { id, musicID } = req.params

        const playList = playLists.find(play => play.id === +id)
        const music = playList.musicas.find(music => music.id === +musicID)
        if(!playLists) {
            res.json({ message: "Play List not found!"})
        } 

        if(!music) {
            res.json({ message: "Play List not found!"})
        }

        res.status(200).json(music)
    },
    // POST /playlist
    savePlay: (req, res) =>{
        const { name, tags, musicas} = req.body

        if(typeof name !== "string") {
            return res.status(400).json({ message: 'name must be a string'}) 
        } 

        if (!Array.isArray(tags)) {
         return res.status(400).json({ message: 'tags must be an array' })
         }
  
        if (musicas && !Array.isArray(musicas)) {
        return res.status(400).json({ message: 'musics must be an array' })
        } 
  
        const newPlay = {
            id: Math.floor(Math.random() * 9999999),
            name,
            tags,
            musicas: musicas ?? []
        }

        playLists.push(newPlay)
        res.status(201)
        res.json(newPlay)
    },
    // POST /playlist/:id/music/
    saveMusic: (req, res) =>{
        const { title, ano, artista, album } = req.body
        const { id } = req.params

        if(typeof title !== 'string') {
            return res.status(400).json({ message: 'title must be a string'}) 
        }
        
        if(typeof ano !== 'number') {
            return res.status(400).json({ message: 'ano must be a number'}) 
        }

        if(typeof artista !== 'string') {
            return res.status(400).json({ message: 'artista must be a string'}) 
        }

        if(typeof album !== 'string') {
            return res.status(400).json({ message: 'album must be a string'}) 
        }

        const playList = playLists.find(play => play.id === +id) 

        if(!playList) {
            res.json({ message: "PlayList not found!"})
        } 

        const newMusic = {
            id: Math.floor(Math.random() * 9999999),
            title,
            ano,
            artista, 
            album
        }

        playList.musicas.push(newMusic)
        
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

        // não verifiquei se a tags e um array, por que queremos apenas atualizar o conteúdo ja existente nele logo ele já é um array
        if(typeof name !== 'string') {
            return res.status(400).json({ message: 'name must be a string'}) 
        }

        if(typeof tags !== 'string') {
            return res.status(400).json({ message: 'tags must be a string'}) 
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