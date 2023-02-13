const url = require('url');
const {validationResult} = require('express-validator');
const Vehicle = require('../moduls/vehicleRaffles.js');
const Raffle = require("../moduls/raffle");
const Tickets = require('../moduls/tickets.js');
const Subscribers = require("../moduls/subscribe");
const nodemailer = require("nodemailer");
const createTicketsPath = ('../views/admin/createTicketsVehicles.ejs'),
    vehicleSubRafflePath = ('../views/admin/createSubRaffleForVehicle.ejs'),
    remainingSubRafflePath = ('../views/admin/remainingSubRaffle.ejs'),
    megaMillionCreatorPath = ('../views/admin/createMillionRaffle.ejs'),
    ticketsVehicleCardPath = ('../views/raffles/getTicketsVehicles.ejs'),
    errPath = ('../views/error/error.ejs');
const img = ('../public/images/logo.png');

/**Get creator path**/

exports.createVehicle = (req, res) => {
    if (req.body.title === 'Surprise Car' || req.body.title === 'Surprise Bike') {
        return res.render(vehicleSubRafflePath, {
            title: 'Create raffle',
            id: req.body.id
        })
    } else if (req.body.title === 'Mega Millions') {
        return res.render(megaMillionCreatorPath, {
            title: 'Create raffle',
            id: req.body.id
        })
    } else {
        return res.render(remainingSubRafflePath, {
            title: 'Create raffle',
            id: req.body.id
        })
    }

}

exports.createVehicleRaffle = (req, res) => {
    if (!req.body) return res.sendStatus(404)
    const vehicleArr = validationResult(req.body);
    if (!vehicleArr.isEmpty()) {
        const vehicleArrErr = vehicleArr.array()[0].param
        if (vehicleArrErr === 'seriesNo' || vehicleArrErr === 'vehicleImg' ||
            vehicleArrErr === 'engine' || vehicleArrErr === 'capacity' ||
            vehicleArrErr === 'output' || vehicleArrErr === 'transmission' ||
            vehicleArrErr === 'exterior_color' || vehicleArrErr === 'interior_trim' ||
            vehicleArrErr === 'wheels' || vehicleArrErr === 'date') {
            return res.redirect(url.format({
                query: {
                    error: vehicleArrErr
                }
            }))
        }
    }

    const vehicleInfo = new Vehicle(req.body.id, req.body.seriesNo, req.body.name, 'Is not started yet', req.file.path, req.body.engine, req.body.capacity,
        req.body.output, req.body.transmission, req.body.exterior_color, req.body.interior_trim, req.body.wheels, req.body.date);

    vehicleInfo.createVehicleTRaffle()
        .then(result => {
            if (result > 0) {
                Vehicle.getVehicleDrawUsingId(result)
                    .then(infoForEmail => {
                        Subscribers.getSubscribers()
                            .then(subscribers => {
                                subscribers.map(emails => {
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
                                        to: emails.email,
                                        subject: 'WDF',
                                        html: `<body style="text-align: center">
                                <h2 style="color: #000F26">WORLD DUTY FREE!</h2><br>
                                <h3>Raffle for ${infoForEmail.name} will start on ${infoForEmail.launchedTime}, hurry up and try your luck!</h3><br>
                                <h2>GOOD LUCK!</h2><br>
                                <div style="text-align: center">
                                     <img src="cid:unique@kreata.ee" width="300" height="200"/>
                                </div><br>
                                <divstyle="text-align: center">
                                     <img src="cid:logo@website.ee"/>
                                </div><br>
                                <p>© WDF 2022. All rights reserved.</p>
                           </body>`,
                                        attachments: [
                                            {
                                                filename: 'logo.png',
                                                path: process.env.BASE_SERVER_URL + img.slice(9),
                                                cid: 'logo@website.ee'
                                            }, {
                                                filename: 'image.png',
                                                path: process.env.BASE_LOCALHOST_URL + infoForEmail.vehicleImage.slice(6),
                                                cid: 'unique@kreata.ee'
                                            }]
                                    };
                                    transporter.sendMail(mailOptions, (err, info) => {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                })
                                res.render(createTicketsPath, {
                                    title: 'Create ticket',
                                    id: result,
                                    seriesNo:req.body.seriesNo
                                })
                            })
                    })
            }
        })
        .catch(err => {
            if (err) return res.render(errPath)
        })
}

/**Delete vehicle raffle**/
exports.deleteRaffle = (req, res) => {
    if (!req.body) return res.sendStatus(404)
    const vehicleArr = validationResult(req.body);
    if (!vehicleArr.isEmpty()) {
        const vehicleArrErr = vehicleArr.array()[0].param
        if (vehicleArrErr === 'id') {
            return res.redirect(url.format({
                query: {
                    error: vehicleArrErr
                }
            }))
        }
    }

    let id = req.body.id,
        remId = req.body.remId;
    Tickets.deleteVehicleTickets(id)
        .then(result => {
            Vehicle.deleteVehicleRaffle(id)
                .then(result => {
                    return Raffle.getSubVehicleRaffle(remId)
                        .then(result => {
                            return res.render(ticketsVehicleCardPath, {
                                title: 'Tickets',
                                params: result,
                                id: req.body.id
                            })
                        })
                })
                .catch(err => {
                    if (err) return res.render(errPath, {
                        title: 'Something gone wrong'
                    })
                })


        })
        .catch(err => {
            if (err) return res.render(errPath, {
                title: 'Something gone wrong'
            })
        })
}