module.exports = {
    uploadImage: (req, res) => {

    },
    getUserData: (req, res) => {

    },
    getMemeImages: (req, res) => {

    },
    rooms: async (req, res) => {
        const db = req.app.get('db')
        let rooms = await db.get_rooms()
        res.status(200).send(rooms)
    },
    newRoom: async (req, res) => {
        try {
            const db = req.app.get('db')
            let {newRoom, roundsToWin, maxPlayers} = req.body
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
        let {room_number} = req.params
        let info = await db.room_info(room_number)
        res.status(200).send(info)
    }
}
