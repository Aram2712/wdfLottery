const connect = require('../database/mySql.js');

module.exports = class UPI {
    constructor(user_id, userName, userEmail, bankRefNo, payImg, amount, ticketCount, pg, refNo, status) {
        this.user_id = user_id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.bankRefNo = bankRefNo;
        this.payImg = payImg;
        this.amount = amount;
        this.ticketCount = ticketCount;
        this.pg = pg;
        this.refNo = refNo;
        this.status = status;
    }

    createIMPSPayment() {
        let upiArr = [this.user_id, this.userName, this.userEmail, this.bankRefNo, this.payImg,
            this.amount, this.ticketCount, this.pg, this.refNo, this.status];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO imps_payment (user_id, userName, userEmail, bankRefNo, payImg, amount, ticketCount, pg, refNo, status) VALUES (?,?,?,?,?,?,?,?,?,?)';
            connect.query(sql, upiArr)
                .then(result => {
                    if (result[0].insertId > 0) {
                        resolve(result[0].insertId)
                    }
                })
                .catch(err => {
                    if (err) {
                        reject(err)
                    }
                })
        })
    }

    static getIMPSPayment() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM imps_payment';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static sendIMPSImg(imgInfo) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE imps_payment SET payImg=? WHERE id=?';
            connect.query(sql, imgInfo)
                .then(result => {
                    if (result) {
                        resolve(true)
                    }
                })
                .catch(err => {
                    if (err) {
                        reject(err)
                    }
                })
        })
    }
}