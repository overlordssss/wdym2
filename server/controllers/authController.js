const bcrypt = require('bcrypt');

// here is the auth controller file. Contains all modules related to authentication
module.exports = {
    login: (req, res) => {
        // set db variable
        const db = req.app.get('db');
        // desctructuring password and username from the body
        const { username, password } = req.body;
        db.login(username)
            .then(([user]) => {
                // using bcrypt to compare thier password with the one in the database
                if (bcrypt.compareSync(password, user.password)) {
                    // here bcrypt deletes the typed password and only compares the hashed password
                    delete user.password;
                    req.session.user = user;
                    res.status(200).send(user);
                } else {
                    // if the passwords don't match you will get this message.
                    res.status(401).send({ error: 'Invalid username or password' })
                }
            })
            .catch(err => {
                res.status(500).send(err)
            })

    },
    register: (req, res) => {
        // setting db variable
        const db = req.app.get('db');
        // getting the uset to register from the body
        const user = req.body;
        // setting a password variable to be hased and salted
        let pwd = bcrypt.hashSync(user.password, 10);
        user.password = pwd;
        db.user
            // insert is a massive statement that does some sql magic for us
            .insert(user)
            // here we're creating a new user object to be stored in the database
            .then(u => {
                req.session.user = u;
                delete u.password;
                res.status(201).send(u)
            })
            .catch(err => {
                res.status(500).send(err)
            });
    },
    logout: (req, res) => {
        // if there is a user on the session destroy that session when logged out and send this message.
        if (req.session.user) {
            req.session.destroy()
            res.status(200).send({ message: 'Succesfully logged out.' })
        }
    }
}