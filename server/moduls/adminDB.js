const connect = require('../database/mySql.js');
const bcrypt = require('bcrypt');

module.exports = class Admin {
    constructor() {
    }

    static adminLogin(email, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM admin WHERE email=?';
            connect.query(sql, [email])
                .then(result => {
                    let adminInfo = result[0][0];
                    if (adminInfo.id > 0) {
                        if (!bcrypt.compareSync(password, adminInfo.password)) {
                            reject(false)
                            throw resolve(adminInfo.id)
                        }
                        resolve(adminInfo)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM users_register';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getAllUsersInfo() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT userImg,title,firstName,lastName,email,nationality,phoneNo FROM users_register';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getMlnRaffle() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT title,sub_raffle.launchedTime, status,seriesNo,imgPath FROM sub_raffle JOIN raffle on sub_raffle.raffleId = raffle.id';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleRaffle() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT title,sub_raffle_vehicles.launchedTime,status,seriesNo,vehicleImage FROM sub_raffle_vehicles JOIN raffle on sub_raffle_vehicles.raffleId = raffle.id';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getBoughtTickets() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM purchased_tickets';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleDrawCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM sub_raffle_vehicles';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getMlnTicketCount() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM sub_raffle';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getSubscribers() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM subscribers';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getOwnerInfo() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM owner_info';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getOwnerWalletWithId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM owner_info WHERE id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static confirmWalletChanges(walletInfo) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE owner_info SET qrPath=?,vpaCode=? WHERE id=?';
            connect.query(sql, walletInfo)
                .then(result => {
                    if (result) {
                        resolve('Wallet changed')
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static confirmUpiWalletChanges(walletInfo){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE owner_info SET accNo=?,ifscCode=?,holderName=?,bankName=? WHERE id=?';
            connect.query(sql, walletInfo)
                .then(result => {
                    if (result) {
                        resolve('Wallet changed')
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static changeImpsTransactionStatus(info){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE imps_payment SET status=? WHERE id=?';
            connect.query(sql,info)
                .then(result => {
                    if (result){
                        resolve('Payment confirmed')
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    static changeUpiTransactionStatus(info){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE upi_payment SET status=? WHERE id=?';
            connect.query(sql,info)
                .then(result => {
                    if (result){
                        resolve('Payment confirmed')
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}