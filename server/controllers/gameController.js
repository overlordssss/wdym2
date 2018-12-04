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
            let room = req.body.newRoom
            let creator = req.session.user.username
            await db.new_room(room, creator)
            res.status(200)
            
        } catch (error) {
            console.log("=======ERROR========", error)
            res.send("sorry, you suck")
        }
    }
}
