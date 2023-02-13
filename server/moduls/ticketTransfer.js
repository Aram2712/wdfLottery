const connect = require('../database/mySql.js');

module.exports = class TicketTransfer {
    constructor(userId, drawTitle,seriesNo,ticketAmount,status) {
        this.userId = userId;
        this.drawTitle = drawTitle;
        this.seriesNo = seriesNo;
        this.ticketAmount = ticketAmount;
        this.status = status;
    }

    boughtTickets(){
        let ticketArr = [this.userId, this.drawTitle,this.seriesNo,this.ticketAmount,this.status]
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO pre_orders(userId, drawTitle, drawSerialNO, ticketAmount, orderStatus) VALUES (?,?,?,?,?)';
            connect.query(sql,ticketArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getBoughtTicketsAndRaffles() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT pre_orders.userId,pre_orders.drawTitle,pre_orders.drawSerialNO,pre_orders.ticketAmount,pre_orders.orderStatus,users_register.firstName,users_register.lastName FROM pre_orders JOIN users_register ON pre_orders.userId = users_register.id';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })

    }

    static getVehicleRaffleAndSubRaffle(srvId,raffleId) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT sub_raffle_vehicles.seriesNo,sub_raffle_vehicles.status,sub_raffle_vehicles.ticketCount, raffle.title FROM sub_raffle_vehicles JOIN raffle on sub_raffle_vehicles.raffleId = raffle.id WHERE sub_raffle_vehicles.id=? and raffle.id=?';
            connect.query(sql, [srvId,raffleId])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getMlnRaffleAndSubRaffle(srmId,raffleId) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT sub_raffle.seriesNo,sub_raffle.status,sub_raffle.ticketCount,raffle.title FROM sub_raffle JOIN raffle ON sub_raffle.raffleId = raffle.id WHERE sub_raffle.id=? and raffle.id=?';
            connect.query(sql,[srmId,raffleId])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deleteVehicleTickets(ticketId){
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM vehicle_tickets WHERE id=?'
            connect.query(sql,[ticketId])
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deleteMlnTickets(ticketId){
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM tickets WHERE id=?'
            connect.query(sql,[ticketId])
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    static sendUserBoughtDrawInfo(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT pre_orders.id, pre_orders.drawtitle, pre_orders.drawserialno, pre_orders.ticketamount, pre_orders.orderstatus FROM pre_orders WHERE userId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getBoughtTickets(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT preOrderId,ticketPrice,ticketNo FROM purchased_tickets WHERE userId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static editPreOrderWithSerialNo(info){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE pre_orders SET orderStatus=? WHERE drawSerialNO=?';
            connect.query(sql,info)
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static vehicleTicketCount(info){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE sub_raffle_vehicles SET ticketCount=? WHERE seriesNo=?';
            connect.query(sql,info)
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static mlnTicketCount(info){
        return new Promise((resolve,reject) => {
            let sql = 'UPDATE sub_raffle SET ticketCount=? WHERE seriesNo=?';
            connect.query(sql,info)
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}



