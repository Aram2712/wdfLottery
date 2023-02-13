const connect = require('../database/mySql.js');

module.exports = class Raffle{
    constructor(raffleImg,title,launchedTime,raffleDesc) {
        this.raffleImg = raffleImg;
        this.title = title;
        this.launchedTime = launchedTime;
        this.raffleDesc = raffleDesc
    }

    createRaffle(){
        let raffleInfoArr = [this.raffleImg, this.title, this.launchedTime, this.raffleDesc];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO raffle(raffleImg, title, launchedTime, raffleDesc) VALUES (?,?,?,?)';
            connect.query(sql,raffleInfoArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getRaffle(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM raffle WHERE id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    static getAllRaffles(){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM raffle';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getSubVehicleRaffle(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM sub_raffle_vehicles WHERE raffleId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleTickets(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM vehicle_tickets WHERE subRaffleId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getSubRaffle(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM sub_raffle  WHERE raffleId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deleteRaffles(id){
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM raffle WHERE id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static updateTicketCountInSubRaffle(arr){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE sub_raffle_vehicles SET ticketCount=? WHERE id=?';
            connect.query(sql,arr)
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleRaffleSeriesNo(id){
        return new Promise((resolve,reject) => {
            let sql = 'SELECT seriesNo FROM sub_raffle_vehicles WHERE raffleId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getMlnSerialNo(id){
        return new Promise((resolve,reject) => {
            let sql = 'SELECT seriesNo FROM sub_raffle WHERE raffleId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static editRaffleInfo(confirmedInfo){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE raffle SET raffleImg=?,raffleDesc=? WHERE id=?';
            connect.query(sql,confirmedInfo)
                .then(result => {
                    if (result){
                        resolve('Raffle info changed')
                    }
                })
                .catch(err => {
                    if (err){
                        reject('Something went wrong...')
                    }
                })
        })
    }
}