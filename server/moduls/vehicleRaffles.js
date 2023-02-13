const connect = require('../database/mySql.js');

module.exports = class Vehicle {
    constructor(raffleId, seriesNo, name, status, vehicleImage, engine, capacity, output, transmission,
                exterior_color, interior_trim, wheels, launchedTime) {
        this.raffleId = raffleId;
        this.seriesNo = seriesNo;
        this.name = name;
        this.status = status;
        this.vehicleImage = vehicleImage;
        this.engine = engine;
        this.capacity = capacity;
        this.output = output;
        this.transmission = transmission;
        this.exterior_color = exterior_color;
        this.interior_trim = interior_trim;
        this.wheels = wheels;
        this.launchedTime = launchedTime
    }

    createVehicleTRaffle() {
        let vehicleArr = [this.raffleId, this.seriesNo, this.name, this.status, this.vehicleImage, this.engine,
            this.capacity, this.output, this.transmission, this.exterior_color,
            this.interior_trim, this.wheels, this.launchedTime];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO sub_raffle_vehicles(raffleId, seriesNo,name, status,vehicleImage,  engine, capacity, output, transmission, exterior_color, interior_trim, wheels, launchedTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
            connect.query(sql, vehicleArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })

    }

    static getSelectedVehicleInfo(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT sub_raffle_vehicles.id,sub_raffle_vehicles.raffleId,sub_raffle_vehicles.name, sub_raffle_vehicles.seriesNo, sub_raffle_vehicles.status, sub_raffle_vehicles.vehicleImage, sub_raffle_vehicles.engine, sub_raffle_vehicles.capacity, sub_raffle_vehicles.output, sub_raffle_vehicles.transmission, sub_raffle_vehicles.exterior_color, sub_raffle_vehicles.interior_trim, sub_raffle_vehicles.wheels, sub_raffle_vehicles.launchedTime, raffle.title FROM sub_raffle_vehicles JOIN raffle on sub_raffle_vehicles.raffleId = raffle.id WHERE sub_raffle_vehicles.id=?'
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static editVehicleRaffleInfo(info) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE sub_raffle_vehicles SET status=?, engine=?, capacity=?, output=?, transmission=?,exterior_color=?, interior_trim=?, wheels=? WHERE id=?';
            connect.query(sql, info)
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static changeVehicleHalfInfo(info){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE sub_raffle_vehicles SET  engine = ?, capacity = ?, output = ?, transmission = ?,exterior_color = ?, interior_trim = ?, wheels = ? WHERE id = ?'
            connect.query(sql,info)
                .then(result => {
                    if (result){
                        resolve('Info changed')
                    }
                })
                .catch(err => {
                    if (err){
                        reject('Something went wrong')
                    }
                })
        })
    }

    static deleteVehicleRaffle(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM sub_raffle_vehicles WHERE id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleRaffles(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM sub_raffle_vehicles WHERE raffleId=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    if (err) {
                        reject(false)
                    }
                })
        })
    }

    static getVehicleTickets(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM vehicle_tickets WHERE subRaffleId=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getVehicleDrawUsingId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT seriesNo,name,vehicleImage,launchedTime FROM sub_raffle_vehicles WHERE id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static checkVehicleDrawName(id, raffleId) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT sub_raffle_vehicles.seriesNo FROM sub_raffle_vehicles JOIN raffle on sub_raffle_vehicles.raffleId = raffle.id WHERE sub_raffle_vehicles.id=? and raffle.id=?';
            connect.query(sql, [id, raffleId])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static checkMlnDrawName(id, raffle_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT sub_raffle.seriesNo FROM sub_raffle JOIN raffle on sub_raffle.raffleId = raffle.id WHERE sub_raffle.id=? and raffle.id=?';
            connect.query(sql, [id, raffle_id])
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
            let sql = 'UPDATE sub_raffle_vehicles SET price=? WHERE seriesNo=?';
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