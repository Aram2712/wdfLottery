const connect = require('../database/mySql.js');

module.exports = class BoughtTickets{
    constructor(preOrderId,userId,subRaffleId,serialNo,ticketNo,ticketPrice) {
        this.preOrderId = preOrderId;
        this.userId = userId;
        this.subRaffleId = subRaffleId;
        this.serialNo = serialNo;
        this.ticketNo = ticketNo;
        this.ticketPrice = ticketPrice;

    }

    purchasedTickets(){
        let ticketArr = [this.preOrderId ,this.userId,this.subRaffleId,this.serialNo,this.ticketNo,this.ticketPrice]
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO purchased_tickets(preOrderId,userId, subRaffleId, serialNo, ticketNo, ticketPrice) VALUES (?,?,?,?,?,?)';
            connect.query(sql,ticketArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleTickets(ticketId){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT ticketNo FROM vehicle_tickets WHERE id=?';
            connect.query(sql,[ticketId])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getMlnTickets(ticketId){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT ticketNo FROM tickets WHERE id=?';
            connect.query(sql,[ticketId])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}