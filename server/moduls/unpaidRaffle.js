const connect = require('../database/mySql.js');


module.exports = class UnpaidRaffle {
    constructor(userId, raffleId, subRaffleId, ticketCount, price, currency, refId) {
        this.userId = userId;
        this.raffleId = raffleId;
        this.subRaffleId = subRaffleId;
        this.ticketCount = ticketCount;
        this.price = price;
        this.currency = currency;
        this.refId = refId;
    }

    createUnpaidRaffle() {
        let raffleArr = [this.userId, this.raffleId, this.subRaffleId,
            this.ticketCount, this.price, this.refId, this.currency];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO unpaid_raffles (userId, raffleId, subRaffleId, ticketCount, price, currency, refId) VALUES (?,?,?,?,?,?,?)';
            connect.query(sql, raffleArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    if (err) {
                        reject(err)
                    }
                })
        })
    }

    static getUnpaidRaffles(refId){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM unpaid_raffles WHERE refId=?';
            connect.query(sql,[refId])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    if (err) return reject(err)
                })
        })
    }
}