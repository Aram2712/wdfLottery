const url = require('url');
const {validationResult} = require('express-validator');
const Restore = require('../moduls/restorePassword.js'),
    User = require('../moduls/login.js'),
    Raffle = require('../moduls/raffle.js'),
    Mln = require('../moduls/megaMln.js'),
    Vehicle = require('../moduls/vehicleRaffles.js'),
    TicketTransfer = require('../moduls/ticketTransfer.js'),
    BoughtTickets = require('../moduls/ticketsBought.js'),
    UnpaidRaffles = require('../moduls/unpaidRaffle.js'),
    UnpaidTickets = require('../moduls/unpaidTickets.js'),
    Subscribe = require('../moduls/subscribe.js'),
    UPI = require('../moduls/upiPayment.js'),
    IMPS = require('../moduls/impsPayment.js');
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const Winners = require("../moduls/winnersCreating");
const img = ('../public/images/logo.png');
const request = require('request');
const fetch = require('node-fetch');


exports.restorePassword = (req, res) => {
    if (!req.body) res.sendStatus(404);
    const restArr = validationResult(req.body)
    if (!restArr.isEmpty()) {
        const restParam = restArr.array()[0].param
        if (restParam === 'email') {
            return res.redirect(url.format({
                query: {
                    error: restParam
                }
            }))
        }
    }

    const email = req.body.email;
    console.log(email)
    Restore.checkDB(email)
        .then(result => {
            if (result) {
                let transporter = nodemailer.createTransport({
                    pool: true,
                    host: process.env.INFO_EMAIL_HOSTNAME,
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.INFO_EMAIL_USERNAME,
                        pass: process.env.INFO_EMAIL_PASS
                    }
                });
                let mailOptions = {
                    from: process.env.INFO_EMAIL_USERNAME,
                    to: email,
                    subject: 'WDF',
                    html: `<body style="text-align: center">
                                <h2 style="color: #000F26">Please go through this link</h2><br>
                                <h3><a href="${process.env.HOSTNAME + '/#/authorization/enternewpassword'}">Change Password</a></h3><br>
                                <img src="cid:unique@kreata.ee"/>
                                <p>© WDF 2022. All rights reserved.</p>
                           </body>`,
                    attachments: [{
                        filename: 'logo.png',
                        path: process.env.BASE_SERVER_URL + img.slice(9),
                        cid: 'unique@kreata.ee'
                    }]
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err)
                    }

                    res.sendStatus(200)
                })
            }
        })
        .catch(err => {
            if (err) {
                res.sendStatus(404)
            }
        })
}

exports.updatePassword = (req, res) => {
    if (!req.body) res.sendStatus(404);
    const restArr = validationResult(req.body)
    if (!restArr.isEmpty()) {
        const restParam = restArr.array()[0].param
        if (restParam === 'password') {
            return res.redirect(url.format({
                query: {
                    error: restParam
                }
            }))
        }
    }

    let password = req.body.password,
        email = req.body.email;


    Restore.updatePassword(password, email)
        .then(result => {
            if (result) {
                res.status(200).send('OK')
            }
        })
        .catch(err => {
            if (err) res.sendStatus(404)
        })
}

/**Apply users info**/

exports.applyInfo = (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            const {mobile, nationality, dataBirth, passport} = req.body;
            let token = req.token
            User.getUserUsingToken(token)
                .then(result => {
                    let id = result.userId;
                    let newInfo = [mobile, nationality, dataBirth, passport, id];
                    User.updateUserData(newInfo)
                        .then(updateResult => {
                            if (updateResult === true) {
                                User.getUser(id)
                                    .then(user => {
                                        res.send(user)
                                    })
                                    .catch(err => {
                                        if (err) res.send(err)
                                    })
                            }
                        })
                })
        }
    })
}

/**Upload user image**/
exports.uploadImage = (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN, (err, authData) => {
        if (err) {
            res.status(403).send('Token not verified')
        } else {
            let token = req.token;
            User.getUserUsingToken(token)
                .then(info => {
                    let id = info.userId
                    let imgArr = [req.file.path, id];
                    User.saveImage(imgArr)
                        .then(feedback => {
                            if (feedback === true) {
                                User.getUser(id)
                                    .then(fullInfo => {
                                        res.send(fullInfo)
                                    })
                                    .catch(err => {
                                        if (err) {
                                            res.status(404).send('Invalid user info')
                                        }
                                    })
                            }
                        })
                        .catch(err => {
                            if (err === false) {
                                res.status(500).send('User image not uploaded')
                            }
                        })

                })
                .catch(err => {
                    if (err) {
                        res.send('Wrong token')
                    }
                })
        }

    })

}

/**Raffles and sub raffles**/

exports.getRaffles = (req, res) => {
    Raffle.getAllRaffles()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            if (err) res.sendStatus(404)
        })
}

exports.getMlnRaffle = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const getMlnRaffArr = validationResult(req.body);
    if (!getMlnRaffArr.isEmpty()) {
        const getMlnRaffErr = getMlnRaffArr.array()[0].param;
        if (getMlnRaffErr === 'id') {
            return res.redirect(url.format({
                query: {
                    error: getMlnRaffErr
                }
            }))
        }
    }
    let id = req.body.id;
    Mln.getMlnRaffles(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            if (err) res.sendStatus(404)
        })
}

/**Send vehicle info**/
exports.vehicleInfos = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const VRI = validationResult(req.body);
    if (!VRI.isEmpty()) {
        const VRIE = VRI.array()[0].param;
        if (VRIE === 'id') {
            return res.redirect(url.format({
                query: {
                    error: VRIE
                }
            }))
        }
    }
    let id = req.body.id;
    Vehicle.getVehicleRaffles(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            if (err) res.sendStatus(404)
        })
}

exports.getRafTick = (req, res) => {
    if (!req.body) res.sendStatus(404)
    const bodyId = validationResult(req.body);
    if (!bodyId.isEmpty()) {
        const bodyIdErr = bodyId.array()[0].param;
        if (bodyIdErr === 'id') {
            return res.redirect(url.format({
                query: {
                    error: bodyIdErr
                }
            }))
        }
    }
    let {id, raffle_id} = req.body;
    Vehicle.checkVehicleDrawName(id, raffle_id)
        .then(vehicleInfo => {
            if (vehicleInfo === undefined) {
                Vehicle.checkMlnDrawName(id, raffle_id)
                    .then(mlnInfo => {
                        Mln.getMlnTickets(id)
                            .then(mlnTickRes => {
                                res.send(mlnTickRes)
                            })
                    })
            } else {
                Vehicle.getVehicleTickets(id)
                    .then(vehTickets => {
                        res.send(vehTickets)
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        })

}
/**Buy tickets**/

exports.boughtTickets = (req, res) => {
    if (!req.body) return res.sendStatus(404)
    const boughtTicketsArr = validationResult(req.body);
    if (!boughtTicketsArr.isEmpty()) {
        const ticketsErr = boughtTicketsArr.array()[0].param
        if (ticketsErr === 'id' || ticketsErr === 'raffleId' || ticketsErr === 'concretRaffleId' || ticketsErr === 'ticketsId') {
            return res.redirect(url.format({
                query: {
                    error: ticketsErr
                }
            }))
        }
    }
    const {id, raffleId, concretRaffleId, ticketsId, price, currency, refId, paymentName, bankRef} = req.body;
    console.log(req.body);

    let unpaidRaffle = new UnpaidRaffles(id, raffleId, concretRaffleId, ticketsId.length, price, refId, currency);
    unpaidRaffle.createUnpaidRaffle()
        .then(raffleCreated => {
            if (raffleCreated > 0) {
                ticketsId.map(id => {
                    let unpaidTickets = new UnpaidTickets(concretRaffleId, id, refId);
                    unpaidTickets.createUnpaidTickets()
                        .then(ticketsCreated => {
                            if (ticketsCreated > 0) {
                                console.log(ticketsCreated)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })


                /**Online payment**/

                User.getUser(id)
                    .then(userInfo => {

                        let {firstName, lastName, email} = userInfo;
                        if (paymentName === 'UPI') {

                            let UPIPayment = new UPI(id, firstName + ' ' + lastName, email, bankRef, '', price, ticketsId.length, paymentName, refId, 'Initialized');
                            UPIPayment.createUPIPayment()
                                .then(result => {
                                    if (result > 0) {
                                        res.json({
                                            id: result,
                                            paymentName: 'UPI'
                                        })
                                    }
                                })
                                .catch(err => {
                                    if (err) {
                                        res.status(400).json('Something went wrong...')
                                    }
                                })
                        } else if (paymentName === 'IMPS') {
                            let IMPSPayment = new IMPS(id, firstName + ' ' + lastName, email, bankRef, '', price, ticketsId.length, paymentName, refId, 'Initialized');

                            IMPSPayment.createIMPSPayment()
                                .then(result => {
                                    if (result > 0) {
                                        res.json({
                                            id: result,
                                            paymentName: 'IMPS'
                                        })
                                    }
                                })
                                .catch(err => {
                                    if (err) {
                                        res.status(400).json('Something went wrong...')
                                    }
                                })
                        }
                    })
                    .catch(err => {
                        if (err) {
                            res.status(500).send('User not found')
                        }
                    })
            }
        })
        .catch(err => {
            if (err) return res.sendStatus(500)
        })
}
/**Upload payment screenshot**/
exports.uploadScreenshot = (req, res) => {
    console.log(req.file)
    let {paymentName, id} = req.body;
    if (paymentName === 'UPI') {
        let imgInfo = [req.file.path, id]
        UPI.sendUPIImg(imgInfo)
            .then(result => {
                if (result === true) {
                    res.status(201).send('UPI transaction has created')
                }
            })
            .catch(err => {
                if (err) {
                    res.status(400).send('Something went wrong')
                }
            })
    } else if (paymentName === 'IMPS') {
        let imgInfo = [req.file.path, id];
        IMPS.sendIMPSImg(imgInfo)
            .then(result => {
                if (result === true) {
                    res.status(201).send('IMPS transaction has created')
                }
            })
            .catch(err => {
                if (err) {
                    res.status(400).send('Something went wrong')
                }
            })
    }
}
/**Confirm bought**/
exports.checkPayStatus = (req, res) => {
    const {refId} = req.body;
    UnpaidRaffles.getUnpaidRaffles(refId)
        .then(unpaidRaffleInfos => {

            TicketTransfer.getVehicleRaffleAndSubRaffle(unpaidRaffleInfos.subRaffleId, unpaidRaffleInfos.raffleId)
                .then(vehicleResult => {
                    let boughtTicketArr = new TicketTransfer(unpaidRaffleInfos.userId, vehicleResult.title, vehicleResult.seriesNo, unpaidRaffleInfos.ticketCount, vehicleResult.status);
                    let ticketLength = Number(vehicleResult.ticketCount) - Number(unpaidRaffleInfos.ticketCount);
                    let ticketArr = [ticketLength, vehicleResult.seriesNo];
                    if (ticketLength === 0) {
                        let statusInfo = ['Sold out', unpaidRaffleInfos.subRaffleId]
                        Vehicle.editVehicleRaffleInfo(statusInfo)
                            .then(statusUpdated => {
                                TicketTransfer.vehicleTicketCount(ticketArr)
                                    .then(done => {
                                        if (done === true) {
                                            boughtTicketArr.boughtTickets()
                                                .then(result => {
                                                    UnpaidTickets.getUnpaidTickets(refId)
                                                        .then(unpaidTicketsInfo => {
                                                            unpaidTicketsInfo.map(info => {
                                                                let ticketId = info.ticketId;
                                                                BoughtTickets.getVehicleTickets(ticketId)
                                                                    .then(ticketNo => {
                                                                        let tickets = new BoughtTickets(result, unpaidRaffleInfos.userId, unpaidRaffleInfos.subRaffleId, vehicleResult.seriesNo, ticketNo.ticketNo, unpaidRaffleInfos.price);
                                                                        tickets.purchasedTickets()
                                                                            .then(purTicketsInfo => {
                                                                                console.log(purTicketsInfo)
                                                                            })
                                                                            .catch(err => {
                                                                                console.log(err)
                                                                            })
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err)
                                                                    })
                                                                TicketTransfer.deleteVehicleTickets(ticketId)
                                                                    .then(done => {
                                                                        console.log(done)
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err)
                                                                    })
                                                            })
                                                            res.json({
                                                                status:'true',
                                                                message:'Transaction confirmed'
                                                            })
                                                        })
                                                        .catch(err => {
                                                            if (err) {
                                                                res.sendStatus(500)
                                                            }
                                                        })


                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            })
                            .catch(err => {
                                if (err) {
                                    console.log(err)
                                    res.status(500).send('Something went wrong...')
                                }
                            })
                    } else {
                        TicketTransfer.vehicleTicketCount(ticketArr)
                            .then(done => {
                                if (done === true) {
                                    boughtTicketArr.boughtTickets()
                                        .then(result => {
                                            UnpaidTickets.getUnpaidTickets(refId)
                                                .then(unpaidTicketsInfo => {
                                                    unpaidTicketsInfo.map(info => {
                                                        let ticketId = (info.ticketId)
                                                        BoughtTickets.getVehicleTickets(ticketId)
                                                            .then(ticketNo => {
                                                                let tickets = new BoughtTickets(result, unpaidRaffleInfos.userId, unpaidRaffleInfos.subRaffleId, vehicleResult.seriesNo, ticketNo.ticketNo, unpaidRaffleInfos.price);
                                                                tickets.purchasedTickets()
                                                                    .then(purTicketsInfo => {
                                                                        console.log(purTicketsInfo)
                                                                    })
                                                                    .catch(err => {
                                                                        console.log(err)
                                                                    })
                                                            })
                                                            .catch(err => {
                                                                console.log(err)
                                                            })
                                                        TicketTransfer.deleteVehicleTickets(ticketId)
                                                            .then(done => {
                                                                console.log(done)
                                                            })
                                                            .catch(err => {
                                                                console.log(err)
                                                            })
                                                    })
                                                    res.json({
                                                        status:'true',
                                                        message:'Transaction confirmed'
                                                    })
                                                })
                                                .catch(err => {
                                                    if (err) {
                                                        res.sendStatus(500)
                                                    }
                                                })


                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }

                })
                .catch(err => {
                    if (err) {

                        /**Mln tickets**/

                        TicketTransfer.getMlnRaffleAndSubRaffle(unpaidRaffleInfos.subRaffleId, unpaidRaffleInfos.raffleId)
                            .then(mlnResult => {
                                let boughtTickets = new TicketTransfer(unpaidRaffleInfos.userId, mlnResult.title, mlnResult.seriesNo, unpaidRaffleInfos.ticketCount, mlnResult.status);
                                let ticketLength = Number(mlnResult.ticketCount) - Number(unpaidRaffleInfos.ticketCount);
                                let ticketArr = [ticketLength, mlnResult.seriesNo];
                                if (ticketLength === 0) {
                                    let mlnStatusInfo = ['Sold out', unpaidRaffleInfos.subRaffleId];
                                    Mln.changeMlnRaffleInfo(mlnStatusInfo)
                                        .then(statusUpdated => {
                                            TicketTransfer.mlnTicketCount(ticketArr)
                                                .then(done => {
                                                    if (done === true) {
                                                        boughtTickets.boughtTickets()
                                                            .then(result => {
                                                                UnpaidTickets.getUnpaidTickets(refId)
                                                                    .then(unpaidTicketsInfo => {
                                                                        unpaidTicketsInfo.map(info => {
                                                                            let ticketId = info.ticketId
                                                                            BoughtTickets.getMlnTickets(ticketId)
                                                                                .then(ticketNo => {
                                                                                    let tickets = new BoughtTickets(result, unpaidRaffleInfos.userId, unpaidRaffleInfos.subRaffleId, mlnResult.seriesNo, ticketNo.ticketNo, unpaidRaffleInfos.price, mlnResult.status);
                                                                                    tickets.purchasedTickets()
                                                                                        .then(purTicketsInfo => {
                                                                                            console.log(purTicketsInfo)
                                                                                        })
                                                                                        .catch(err => {
                                                                                            console.log(err)
                                                                                        })
                                                                                })
                                                                                .catch(err => {
                                                                                    console.log(err)
                                                                                })
                                                                            TicketTransfer.deleteMlnTickets(ticketId)
                                                                                .then(done => {
                                                                                    console.log(done)
                                                                                })
                                                                                .catch(err => {
                                                                                    console.log(err)
                                                                                })
                                                                        })
                                                                        res.json({
                                                                            status:'true',
                                                                            message:'Transaction confirmed'
                                                                        })
                                                                    })
                                                                    .catch(err => {
                                                                        if (err) {
                                                                            res.sendStatus(500)
                                                                        }
                                                                    })

                                                            })
                                                    }
                                                })
                                        })
                                } else {
                                    TicketTransfer.mlnTicketCount(ticketArr)
                                        .then(done => {
                                            if (done === true) {
                                                boughtTickets.boughtTickets()
                                                    .then(result => {
                                                        UnpaidTickets.getUnpaidTickets(refId)
                                                            .then(unpaidTicketsInfo => {
                                                                unpaidTicketsInfo.map(info => {
                                                                    let ticketId = info.ticketId
                                                                    BoughtTickets.getMlnTickets(ticketId)
                                                                        .then(ticketNo => {
                                                                            let tickets = new BoughtTickets(result, unpaidRaffleInfos.userId, unpaidRaffleInfos.subRaffleId, mlnResult.seriesNo, ticketNo.ticketNo, unpaidRaffleInfos.price, mlnResult.status);
                                                                            tickets.purchasedTickets()
                                                                                .then(purTicketsInfo => {
                                                                                    console.log(purTicketsInfo)
                                                                                })
                                                                                .catch(err => {
                                                                                    console.log(err)
                                                                                })
                                                                        })
                                                                        .catch(err => {
                                                                            console.log(err)
                                                                        })
                                                                    TicketTransfer.deleteMlnTickets(ticketId)
                                                                        .then(done => {
                                                                            console.log(done)
                                                                        })
                                                                        .catch(err => {
                                                                            console.log(err)
                                                                        })
                                                                })
                                                                res.json({
                                                                    status:'true',
                                                                    message:'Transaction confirmed'
                                                                })
                                                            })
                                                            .catch(err => {
                                                                if (err) {
                                                                    res.sendStatus(500)
                                                                }
                                                            })

                                                    })
                                            }
                                        })
                                }
                            })
                    }
                })

        })
        .catch(err => {
            console.log(err)
        })
}
/**Send bought draw all info**/
exports.sendBoughtInfo = (req, res) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN, (err, authData) => {
        if (err) {
            res.status(403).send('Invalid token!')
        } else {
            let {id} = req.body;
            TicketTransfer.sendUserBoughtDrawInfo(id)
                .then(result => {
                    TicketTransfer.getBoughtTickets(id)
                        .then(ticketsResult => {
                            res.status(200).send([result, ticketsResult])
                        })
                        .catch(err => {
                            if (err) res.sendStatus(500)
                        })
                })
                .catch(err => {
                    if (err) res.sendStatus(500)
                })
        }
    })
}
/**Subscribe request**/
exports.subscribeRequest = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const validEmail = validationResult(req.body);
    if (!validEmail.isEmpty()) {
        const validEmailErr = validEmail.array()[0].param
        if (validEmailErr === 'email') {
            return res.redirect(url.format({
                query: {
                    error: validEmailErr
                }
            }))
        }
    }
    let {mail} = req.body;
    let subscribeInfo = new Subscribe(mail);
    subscribeInfo.subscribers()
        .then(result => {
            if (result === true) {
                res.status(200).json('OK')
            }
        })
        .catch(err => {
            if (err.errno === 1062) {
                res.json('You are already subscribed!')
            }
        })
}


/**Send winners**/

exports.sendWinners = (req, res) => {
    Winners.getWinners()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
}
