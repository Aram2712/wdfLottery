const connect = require('../database/mySql.js');
const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = class Registration {
    constructor(title, firstName, lastName, email, password, nationality, passport,
                 birthDay, phoneNo, residenceCountry) {

        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.nationality = nationality;
        this.passport = passport;
        this.birthDay = birthDay;
        this.phoneNo = phoneNo;
        this.residenceCountry = residenceCountry;
    }


    register() {
        let hash = bcrypt.hashSync(this.password, saltRound)
        let registerArray = [ this.title, this.firstName, this.lastName, this.email, hash,
            this.nationality, this.passport, this.birthDay, this.phoneNo, this.residenceCountry]
        const sql = 'INSERT INTO users_register(title, firstName, lastName, email, password, nationality, passport, birthDay, phoneNo, residenceCountry) VALUES (?,?,?,?,?,?,?,?,?,?)'
        return new Promise(((resolve, reject) => {
            connect.query(sql, registerArray)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        }))
    }
}