const connect = require('../database/mySql.js');

module.exports = class Tickets {
    constructor(subRaffleId, ticketNo, ticketPrice) {
        this.subRaffleId = subRaffleId;
        this.ticketNo = ticketNo;
        this.ticketPrice = ticketPrice
    }

    createTicket() {
        return new Promise((resolve, reject) => {
            let ticketInfoArr = [this.subRaffleId, this.ticketNo, this.ticketPrice];
            let sql = 'INSERT INTO vehicle_tickets(subRaffleId, ticketNo, ticketPrice) VALUES (?,?,?)';
            connect.query(sql, ticketInfoArr)
                .then(result => {
                    let id = result[0].insertId;
                    resolve(id)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    static deleteVehicleTickets(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM vehicle_tickets WHERE subRaffleId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getTickets(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM tickets WHERE subRaffleId=?';
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
}