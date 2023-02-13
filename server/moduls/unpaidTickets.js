const connect = require('../database/mySql.js');


module.exports = class UnpaidTickets {
    constructor(subRaffleId, ticketId, refId) {
        this.subRaffleId = subRaffleId;
        this.ticketId = ticketId;
        this.refId = refId
    }

    createUnpaidTickets() {
        let ticketArr = [this.subRaffleId, this.ticketId, this.refId];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO unpaid_tickets (subRaffleId, ticketId, refId) VALUES (?,?,?)';
            connect.query(sql,ticketArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getUnpaidTickets(refId){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM unpaid_tickets WHERE refId=?';
            connect.query(sql,[refId])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    if (err){
                        return reject(undefined)
                    }
                })
        })
    }
}