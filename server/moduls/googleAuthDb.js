const connect = require('../database/mySql.js')

module.exports = class Facebook {
    constructor(googleId, fullName, email) {
        this.googleId = googleId;
        this.fullName = fullName;
        this.email = email;

    }

    googleAuth(googleId) {
        let idArr = [this.googleId, this.fullName, this.email]
        return new Promise((resolve, reject) => {

            let sql = 'INSERT INTO google_auth(googleId, fullName,email) VALUES (?,?,?) '
            let mySql = 'SELECT * FROM google_auth WHERE googleId = ?'
            connect.query(mySql, googleId)
                .then(result => {
                    let id = result[0][0].googleId;
                    if (googleId === id) {
                        let value = result[0]
                        value.forEach(items => {
                            resolve(items)

                        })
                    }

                })
                .catch(err => {
                    console.log(err)
                    connect.query(sql, idArr)
                        .then(result => {
                            resolve(result[0].insertId)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })


        })
    }


}