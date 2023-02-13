const connect = require('../database/mySql.js');


module.exports = class Tokens {
    constructor(userId, accessToken) {
        this.userId = userId;
        this.accessToken = accessToken;
    }

    createUserToken() {
        let tokenArr = [this.userId, this.accessToken]
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO access_token(userId, userToken) VALUES (?,?)';
            connect.query(sql, tokenArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static refreshAccessToken(refreshToken) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE access_token SET userToken=? WHERE userId=?';
            connect.query(sql, refreshToken)
                .then(result => {
                    if (result) resolve(true)
                })
                .catch(err => {
                    if (err) reject(err)
                })
        })
    }

    static getAllAboutUser(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT users_register.id, userImg, title, firstName, lastName, email, nationality, passport, birthDay, phoneNo, residenceCountry, users_register.create_at, userToken FROM users_register JOIN access_token ON users_register.id = access_token.userId WHERE users_register.id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getAccessToken(userId){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT userToken FROM access_token WHERE userId=?';
            connect.query(sql,[userId])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static updateAccessToken(userInfo){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE access_token SET userToken=? WHERE userId=?';
            connect.query(sql,userInfo)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}