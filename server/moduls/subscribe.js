const connect = require('../database/mySql.js');


module.exports = class Subscribe{
    constructor(email) {
        this.email = email;
    }

    subscribers(){
        let email = [this.email];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO subscribers (email) VALUES (?)';
            connect.query(sql,email)
                .then(result => {
                    if (result[0].insertId > 0){
                        return resolve(true)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getSubscribers(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT email FROM subscribers';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}