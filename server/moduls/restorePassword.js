const connect = require('../database/mySql.js');
const bcrypt = require('bcrypt');
const saltRound = 10;


module.exports = class Restore{
    constructor() {
    }

    static checkDB(email){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM users_register WHERE email=?';
            connect.query(sql,[email])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static updatePassword(password,email){
        let hash = bcrypt.hashSync(password,saltRound)

        return new Promise((resolve, reject) => {
            let sql = 'UPDATE users_register SET password=? WHERE email=?';
            connect.query(sql,[hash,email])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}