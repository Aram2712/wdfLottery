const connect = require('../database/mySql.js');


module.exports = class Mln {
    constructor(raffleId, imgPath, seriesNo, status, solution, subRaffleTitle, solution2, solution3,
                solution4, solution5, solution6, solution7, launchedTime) {
        this.raffleId = raffleId;
        this.imgPath = imgPath;
        this.seriesNo = seriesNo;
        this.status = status;
        this.solution = solution
        this.subRaffleTitle = subRaffleTitle;
        this.solution2 = solution2;
        this.solution3 = solution3;
        this.solution4 = solution4;
        this.solution5 = solution5;
        this.solution6 = solution6;
        this.solution7 = solution7;
        this.launchedTime = launchedTime
    }

    createMlnRaffle() {
        let mlnArr = [this.raffleId, this.imgPath, this.seriesNo, this.status, this.solution, this.subRaffleTitle,
            this.solution2, this.solution3, this.solution4, this.solution5, this.solution6, this.solution7, this.launchedTime];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO sub_raffle(raffleId, imgPath, seriesNo,status, solution, subRaffleTitle, solution2, solution3, solution4, solution5, solution6, solution7,launchedTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
            connect.query(sql, mlnArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deleteMlnRaffle(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM sub_raffle WHERE id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deleteMlnTickets(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM tickets WHERE subRaffleId=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getMlnSubRaffle(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT sub_raffle.id,sub_raffle.raffleId, sub_raffle.imgPath, sub_raffle.seriesNo, sub_raffle.status, sub_raffle.solution, sub_raffle.subRaffleTitle, sub_raffle.solution2, sub_raffle.solution3, sub_raffle.solution4, sub_raffle.solution5, sub_raffle.solution6, sub_raffle.solution7, sub_raffle.launchedTime, sub_raffle.create_at, raffle.title FROM sub_raffle JOIN raffle on sub_raffle.raffleId = raffle.id WHERE sub_raffle.id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static changeMlnRaffleInfo(info) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE sub_raffle SET status=?,solution=?,subRaffleTitle=? WHERE id=?';
            connect.query(sql, info)
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static changeMlnHalfInfo(info) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE sub_raffle SET solution=?,subRaffleTitle=? WHERE id=?'
            connect.query(sql,info)
                .then(result => {
                    if (result){
                        return resolve('Changed')
                    }
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }

    static getMlnRaffles(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM sub_raffle WHERE raffleId=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(false)
                })

        })
    }

    static getMlnTickets(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM tickets WHERE subRaffleId=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static updateMlnSubRaffle(arr) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE sub_raffle SET ticketCount=? WHERE id=?';
            connect.query(sql, arr)
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(false)
                })
        })
    }

    static getMlnDrawUsingId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT imgPath,seriesNo,solution,launchedTime FROM sub_raffle WHERE id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static updateSubRafflePrice(info) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE sub_raffle SET price=? WHERE seriesNo=?';
            connect.query(sql, info)
                .then(result => {
                    if (result) {
                        resolve(true)
                    }
                })
                .catch(err => {
                    if (err) {
                        reject(false)
                    }
                })
        })
    }
}