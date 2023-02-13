const url = require('url');
const {validationResult} = require('express-validator');
const Ticket = require('../moduls/tickets.js'),
    MlnTickets = require('../moduls/remTickets.js'),
    Raffle = require('../moduls/raffle.js'),
    Mln = require('../moduls/megaMln.js'),
    VehicleRaffles = require('../moduls/vehicleRaffles.js'),
    MlnRaffle = require('../moduls/megaMln.js');
const donePath = ('../views/admin/allDone.ejs'),
    raffleCardPath = ('../views/raffles/getRaffleCard.ejs'),
    errPath = ('../views/error/error.ejs');

/**Create tickets for vehicles**/
exports.createTickets = (req, res, next) => {
    if (!req.body) return res.sendStatus(404);
    const ticketArr = validationResult(req.body);
    if (!ticketArr.isEmpty()) {
        const ticketArrErr = ticketArr.array()[0].param;
        if (ticketArrErr === 'id' || ticketArrErr === 'from' || ticketArrErr === 'to'
            || ticketArrErr === 'ticketPrice') {
            return res.redirect(url.format({
                query: {
                    error: ticketArrErr
                }
            }))
        }
    }
    let info = [req.body.ticketPrice, req.body.seriesNo];
    VehicleRaffles.updateSubRafflePrice(info)
        .then(datum => {
            if (datum === true) {
                for (let i = req.body.from; i <= req.body.to; i++) {
                    let ticketInfo = new Ticket(req.body.id, i.toString(), req.body.ticketPrice);
                    ticketInfo.createTicket()
                        .then(result => {
                            Raffle.getVehicleTickets(req.body.id)
                                .then(result => {
                                    let arr = [result.length, req.body.id]
                                    Raffle.updateTicketCountInSubRaffle(arr)
                                        .then(info => {
                                            Raffle.getAllRaffles()
                                                .then(result => {
                                                    if (result) {
                                                        next(res.render(donePath,{
                                                            title:'Done',
                                                            link:'/get_raffles'
                                                        }))
                                                    }
                                                })
                                                .catch(err => {
                                                    if (err) return res.render(errPath, {
                                                        title: 'Something gone wrong'
                                                    })
                                                })
                                        })
                                })
                        })
                        .catch(err => {
                            if (err) return res.render(errPath, {
                                title: 'Something gone wrong'
                            })
                        })
                }
            }
        })
}

/**Create tickets for mln and remaining**/

exports.createRemainingTickets = (req, res, next) => {
    if (!req.body) return res.sendStatus(404);
    const mlnTicketArr = validationResult(req.body);
    if (!mlnTicketArr.isEmpty()) {
        const ticketArrErr = mlnTicketArr.array()[0].param;
        if (ticketArrErr === 'id' || ticketArrErr === 'from' || ticketArrErr === 'to'
            || ticketArrErr === 'ticketPrice') {
            return res.redirect(url.format({
                query: {
                    error: ticketArrErr
                }
            }))
        }
    }
    let info = [req.body.ticketPrice, req.body.seriesNo];
    MlnRaffle.updateSubRafflePrice(info)
        .then(datum => {
            if (datum === true) {
                for (let j = req.body.from; j <= req.body.to; j++) {
                    let mlnTicketInfo = new MlnTickets(req.body.id, j.toString(), req.body.ticketPrice);
                    mlnTicketInfo.createRemTickets()
                        .then(result => {
                            Mln.getMlnTickets(req.body.id)
                                .then(mln => {
                                    let arr = [mln.length, req.body.id];
                                    Mln.updateMlnSubRaffle(arr)
                                        .then(info => {
                                            next(res.render(donePath,{
                                                title:'Done',
                                                link:'/get_raffles'
                                            }))
                                        })
                                })
                        })
                        .catch(err => {
                            if (err) return res.render(errPath, {
                                title: 'Something gone wrong'
                            })
                        })
                }
            }
        })
}