const connect = require('../database/mySql.js')

module.exports = class Facebook {
    constructor(facebookId, fullName) {
        this.facebookId = facebookId;
        this.fullName = fullName;

    }

    facebookAuth(facebookId) {
        let idArr = [this.facebookId, this.fullName]
        return new Promise((resolve, reject) => {

            let sql = 'INSERT INTO facebook_auth(facebookId, fullName) VALUES (?,?) '
            let mySql = 'SELECT * FROM facebook_auth WHERE facebookId = ?'
            connect.query(mySql, facebookId)
                .then(result => {
                    let id = result[0][0].facebookId;
                    if (facebookId === id) {
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