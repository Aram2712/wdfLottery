const connect = require('../database/mySql.js');

module.exports = class Winners {
    constructor(drawId, userId, userImage, drawSeriesNo, fullName, ticketNo, drawDate, nationality,drawTitle) {
        this.drawId = drawId;
        this.userId = userId
        this.userImage = userImage
        this.drawSeriesNo = drawSeriesNo
        this.fullName = fullName
        this.ticketNo = ticketNo
        this.drawDate = drawDate
        this.nationality = nationality
        this.drawTitle = drawTitle
    }

    createWinners() {
        let winnerInfoArr = [this.drawId, this.userId, this.userImage, this.drawSeriesNo, this.fullName, this.ticketNo,
            this.drawDate, this.nationality,this.drawTitle];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO winners(drawId, userId, winnerImg, drawSeriesNo, fullName, ticketNo, drawDate, nationality,drawTitle) VALUES(?,?,?,?,?,?,?,?,?)';
            connect.query(sql,winnerInfoArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getPreOrdersWithSerialNo(serialNo){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM pre_orders WHERE drawSerialNO=?';
            connect.query(sql,[serialNo])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleSeriesNo(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT seriesNo FROM sub_raffle_vehicles';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getMlnSeriesNo(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT seriesNo FROM sub_raffle';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getUserAllInfo(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,firstName,lastName,email,nationality FROM users_register WHERE id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleDrawLaunchDate(seriesNo){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,raffleId, launchedTime FROM sub_raffle_vehicles WHERE seriesNo=?';
            connect.query(sql,[seriesNo])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getMlnDrawLaunchDate(seriesNo){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,raffleId,launchedTime FROM sub_raffle WHERE seriesNo=?';
            connect.query(sql,[seriesNo])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    static getWinners(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM winners';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getUserName(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT firstName,lastName FROM users_register';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getRaffleName(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT title FROM raffle WHERE id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}