module.exports = {
    uploadImage: (req, res) => {

    },
    getUserData: (req, res) => {

    },
    getMemeImages: async (req, res) => {
        try {
            const db = req.app.get('db')
            let memes = await db.get_memes()
            res.status(200).send(memes)
        } catch (error) {
            console.log(`///////////////ERROR//////////////`, error)
            res.send('Problem on the getMemeImages endpoint')
        }
    },
    rooms: async (req, res) => {
        const db = req.app.get('db')
        let rooms = await db.get_rooms()
        res.status(200).send(rooms)
    },
    newRoom: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { newRoom, roundsToWin, maxPlayers } = req.body
            let creator = req.session.user.username
            await db.new_room(newRoom, creator, roundsToWin, maxPlayers)
            res.status(200).send('test')

        } catch (error) {
            console.log("=======ERROR========", error)
            res.send("sorry, you suck")
        }
    },
    roomInfo: async (req, res) => {
        const db = req.app.get('db')
        let { room_number } = req.params
        let info = await db.room_info(room_number)
        res.status(200).send(info)
    },
    updateMax: async (req, res) => {
        const db = req.app.get('db')
        let { currentNumPlayers, room } = req.params.body
        await db.update_max(currentNumPlayers, room)
        res.sendStatus(200)
    },
    memes: async (req, res) => {
        const db = req.app.get('db')
        let {limit} = req.params
        let memes = await db.get_memes(limit)
        res.send(memes).status(200)
    }
}
