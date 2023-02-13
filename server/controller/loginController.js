const url = require('url');
const {validationResult} = require('express-validator');
const loginPath = ('../views/authentication/login.ejs');
const Login = require('../moduls/login.js'),
    Token = require('../moduls/accessToken.js');
const jwt = require("jsonwebtoken");
const oneDay = 1000 * 60 * 60 * 24;
const tokenLife = '30d';


exports.login = (req, res) => {
    const urlValue = Object.keys(req.query).toString()
    let email, password = "";
    if (urlValue === 'email')
        email = urlValue
    if (urlValue === 'password')
        password = urlValue
    res.render(loginPath, {
            title: 'Login',
            email, password
        }
    )
}


exports.authorization = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'password' || arrParam === 'email') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const name = req.body.email;
    const pass = req.body.password;
    let path = ''
    Login.login(name, pass)
        .then(result => {
            if (result) {
                jwt.sign({result}, process.env.ACCESS_TOKEN, {expiresIn: tokenLife}, (err, token) => {
                    let auth = new Token(result.id, token);
                    Token.getAccessToken(result.id)
                        .then(accessToken => {
                            if(accessToken === undefined){
                                auth.createUserToken()
                                    .then(authenticate => {
                                        if (authenticate > 0) {
                                            Token.getAllAboutUser(result.id)
                                                .then(user => {
                                                    path = ''
                                                    session = req.session;
                                                    session.userid = user.id;
                                                    res.cookie('WDF', result.userToken, {
                                                        maxAge: oneDay,
                                                        httpOnly: true,
                                                    })
                                                    res.send(user)
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            } else {
                                let userInfo = [token,result.id]
                                Token.updateAccessToken(userInfo)
                                    .then(done => {
                                        Token.getAllAboutUser(result.id)
                                            .then(user => {
                                                path = ''
                                                session = req.session;
                                                session.userid = user.id;
                                                res.cookie('WDF', result.userToken, {
                                                    maxAge: oneDay,
                                                    httpOnly: true,
                                                })
                                                res.send(user)
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }
                        })
                        .catch(err => {
                            console.log('err',err)
                        })


                })
            }
        })
        .catch(err => {
            res.sendStatus(404)
            console.log('not found', err)

        })
}

