const connect = require('../database/mySql.js')
const bcrypt = require('bcrypt')

module.exports = class Login{

    static login(email,password){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT users_register.id, users_register.title, users_register.firstName, users_register.lastName, users_register.email, users_register.password, users_register.nationality, users_register.passport, users_register.birthDay, users_register.phoneNo, users_register.residenceCountry, users_register.create_at FROM users_register WHERE email=?'
            connect.query(sql,[email])
                .then(result => {
                    const pass = result[0][0].password
                    const id = result[0][0].id
                    if (id > 0){
                        if (!bcrypt.compareSync(password,pass)){
                            reject(false)
                            throw resolve(id)
                        }
                        resolve(result[0][0])
                    }

                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getUser(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT users_register.id,userImg,title,firstName,lastName,email,nationality,passport,birthDay,phoneNo,residenceCountry,access_token.userToken FROM users_register JOIN access_token on users_register.id = access_token.userId WHERE users_register.id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getUserUsingToken(token){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT userId FROM access_token WHERE userToken=?';
            connect.query(sql,[token])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }


    static updateUserData(newInfo){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE users_register SET phoneNo=?,nationality=?,birthDay=?,passport=? WHERE id=?';
            connect.query(sql,newInfo)
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static saveImage(imgInfo){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE users_register SET userImg=? WHERE id=?';
            connect.query(sql,imgInfo)
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    console.log(err)
                    reject(false)
                })
        })
    }
}