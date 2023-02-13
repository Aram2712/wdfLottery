const url = require('url');
require('dotenv').config()
const Register = require('../moduls/register.js'),
    Token = require('../moduls/accessToken.js')
const nodemailer = require('nodemailer');
const {validationResult} = require('express-validator')
const jwt = require("jsonwebtoken");
const regPath = ('../views/authentication/register.ejs');
const img = ('../public/images/logo.png');


exports.register = (req, res) => {
    res.render(regPath)
}
exports.authentication = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body)
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'title' || arrParam === 'firstName' || arrParam === 'lastName' || arrParam === 'email'
            || arrParam === 'password' || arrParam === 'nationality'
            || arrParam === 'passport' || arrParam === 'birthDay'
            || arrParam === 'phoneNo' || arrParam === 'residenceCountry') {
            return res.redirect(url.format({
                pathname: '/',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    let registration = new Register(req.body.title, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.nationality, req.body.passport,
        req.body.birthDay, req.body.phoneNo, req.body.residenceCountry)
    registration.register()
        .then(result => {
            if (result) {
                if (result) {
                    let transporter = nodemailer.createTransport({
                        poll: true,
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
                        to: req.body.email,
                        subject: 'WDF',
                        html: `<body style="text-align: center">
                                               <h2>Dear ${req.body.title + ' ' + req.body.lastName}</h2>
                                               <h3>Welcome to World Duty Free site</h3>
                                               <img src="cid:unique@cid.ee"/>
                                               <p>© WDF 2022. All rights reserved.</p>
                                           </body>`,
                        attachments: [{
                            filename: 'logo.png',
                            path: process.env.BASE_SERVER_URL + img.slice(9),
                            cid: 'unique@cid.ee'
                        }]
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            console.log(err)
                        }
                        res.sendStatus(200)
                    })

                }
            }

        })
        .catch(err => {
            if (err) res.sendStatus(404)
        })


}