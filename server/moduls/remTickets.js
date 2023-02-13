const connect = require('../database/mySql.js');

module.exports = class MlnTickets {
    constructor(subRaffleId, ticketNo, ticketPrice) {
        this.subRaffleId = subRaffleId;
        this.ticketNo = ticketNo;
        this.ticketPrice = ticketPrice
    }

    createRemTickets() {
        return new Promise((resolve, reject) => {
            let remArr = [this.subRaffleId, this.ticketNo, this.ticketPrice];
            let sql = 'INSERT INTO tickets(subRaffleId, ticketNo, ticketPrice) VALUES (?,?,?)';
            connect.query(sql, remArr)
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
}