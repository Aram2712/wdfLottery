const url = require('url');
const {validationResult} = require('express-validator');
const Mln = require('../moduls/megaMln.js'),
    Raffle = require("../moduls/raffle"),
    Subscribers = require('../moduls/subscribe.js');
const ticketsCardPath = ('../views/raffles/getSubTickets.ejs'),
    createRemainingTickets = ('../views/admin/createTicketsRemaining.ejs'),
    errPath = ('../views/error/error.ejs');
const nodemailer = require('nodemailer');
const img = ('../public/images/logo.png');

exports.createMlnRaffle = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const mlnArr = validationResult(req.body);
    if (!mlnArr.isEmpty()) {
        const mlnArrErr = mlnArr.array()[0].param;
        if (mlnArrErr === 'id' || mlnArrErr === 'seriesNo'
            || mlnArrErr === 'total' || mlnArrErr === 'mlnImg') {
            return res.redirect(url.format({
                query: {
                    error: mlnArrErr
                }
            }))
        }
    }

    let mlnInfo = new Mln(req.body.id, req.file.path, req.body.seriesNo, 'Is not started yet', req.body.total, req.body.subRaffleTitle, '', '', '', '', '', '', req.body.date);
    mlnInfo.createMlnRaffle()
        .then(result => {
            if (result > 0) {
                Mln.getMlnDrawUsingId(result)
                    .then(mlnInfoForEmail => {
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
                                                  <h3>Raffle for MEGA MILLION will start on ${mlnInfoForEmail.launchedTime}, hurry up and try your luck!</h3><br>
                                                  <h2>GOOD LUCK!</h2><br>
                                                  <div style="text-align: center">
                                                        <img src="cid:unique@kreata.ee" width="300" height="200"/>
                                                  </div><br>
                                                  <h3>${mlnInfoForEmail.solution}$</h3><br>
                                                  <div style="text-align: center">
                                                        <img src="cid:logo@website.ee"/>
                                                  </div><br>
                                                  <p style="text-align: center">© WDF 2022. All rights reserved.</p>
                                               </body>`,
                                        attachments: [
                                            {
                                                filename: 'logo.png',
                                                path: process.env.BASE_SERVER_URL + img.slice(9),
                                                cid: 'logo@website.ee'
                                            }, {
                                                filename: 'image.png',
                                                path: process.env.BASE_SERVER_URL + mlnInfoForEmail.imgPath.slice(6),
                                                cid: 'unique@kreata.ee'
                                            }]
                                    };
                                    transporter.sendMail(mailOptions, (err, info) => {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                })
                                res.render(createRemainingTickets, {
                                    title: 'Create ticket',
                                    id: result,
                                    seriesNo: req.body.seriesNo
                                })
                            })
                    })

            }
        })
        .catch(err => {
            if (err) return res.render(errPath)
        })
}

/**Delete raffle**/

exports.deleteMlnRaffle = (req, res) => {
    if (!req.body) return res.sendStatus(404)
    const mlnArr = validationResult(req.body);
    if (!mlnArr.isEmpty()) {
        const mlnArrErr = mlnArr.array()[0].param
        if (mlnArrErr === 'id' || mlnArrErr === 'refId') {
            return res.redirect(url.format({
                query: {
                    error: mlnArrErr
                }
            }))
        }
    }

    let id = req.body.id,
        ticketId = req.body.rafId;
    Mln.deleteMlnTickets(id)
        .then(result => {
            if (result) {
                Mln.deleteMlnRaffle(id)
                    .then(deleteResult => {
                        return Raffle.getSubRaffle(ticketId)
                            .then(result => {
                                return res.render(ticketsCardPath, {
                                    title: 'Million`s tickets',
                                    params: result,
                                    id: ticketId
                                })
                            })
                            .catch(err => {
                                if (err) return res.render(errPath, {
                                    title: 'Something gone wrong'
                                })
                            })
                    })
            }
        })
        .catch(err => {

            if (err) return res.render(errPath, {
                title: 'Something gone wrong'
            })
        })
}