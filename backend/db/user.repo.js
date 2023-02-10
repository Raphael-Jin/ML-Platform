const dao = require('./sqlite_dao.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    getUserByUsername: async function (username) {
        return dao.get("SELECT * FROM users WHERE username =?", [username]);
    },

    getUserById: async function (id) {
        return dao.get('SELECT * FROM users WHERE id = ?', [id]);
    }
}