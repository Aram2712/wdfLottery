const url = require('url');
const {validationResult} = require('express-validator');
const diagram = ('../views/admin/diagram.ejs'),
    usersList = ('../views/admin/usersList.ejs'),
    errPath = ('../views/error/error.ejs'),
    loginPage = ('../views/admin/adminLoginPage.ejs'),
    boughtTicketsPage = ('../views/raffles/boughtRaffleInfo.ejs'),
    winnerCreatorPath = ('../views/admin/winners.ejs'),
    getWinnersPath = ('../views/admin/winnersInfo.ejs'),
    transactionHistoryPath = ('../views/admin/transactionHistory.ejs'),
    ownerInfoPath = ('../views/admin/ownerInfo.ejs'),
    walletEditorPath = ('../views/admin/walletEditorPage.ejs');
const Admin = require('../moduls/adminDB.js'),
    TicketTransfer = require('../moduls/ticketTransfer.js'),
    Winners = require('../moduls/winnersCreating.js'),
    UPI = require('../moduls/upiPayment.js'),
    IMPS = require('../moduls/impsPayment.js');
const oneDay = 1000 * 60 * 60 * 24;
const fetch = require('node-fetch');

/**Admin login step by step**/
exports.loginPage = (req, res) => {
    res.render(loginPage, {
        title: 'Login'
    })
}

/**Main pages**/
exports.mainPage = (req, res) => {
    Admin.getUsers()
        .then(usersResult => {
            Admin.getMlnRaffle()
                .then(raffleResult => {
                    Admin.getVehicleRaffle()
                        .then(vehicleResult => {
                            Admin.getBoughtTickets()
                                .then(ticketCount => {
                                    Admin.getVehicleDrawCount()
                                        .then(vehicleTicketCount => {
                                            Admin.getMlnTicketCount()
                                                .then(mlnTicketCount => {
                                                    Admin.getSubscribers()
                                                        .then(subscribers => {
                                                            res.render(diagram, {
                                                                title: 'Admin',
                                                                usersCount: usersResult.length,
                                                                mlnRaffle: raffleResult,
                                                                vehicleResult,
                                                                ticketCount: ticketCount.length,
                                                                vehicleTicketCount: vehicleTicketCount.length,
                                                                mlnTicketCount: mlnTicketCount.length,
                                                                subscribers: subscribers.length
                                                            })
                                                        })

                                                })
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })

                                })
                                .catch(err => {
                                    console.log(err)
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

exports.adminLogin = (req, res) => {
    if (!req.body) res.sendStatus(404)
    const validErr = validationResult(req.body);
    if (!validErr.isEmpty()) {
        const errParam = validErr.array()[0].param;
        if (errParam === 'email' || errParam === 'password') {
            return res.redirect(url.format({
                query: {
                    errParam
                }
            }))
        }
    }

    let email = req.body.email,
        password = req.body.password;
    Admin.adminLogin(email, password)
        .then(result => {
            if (result) {
                if (Number.isInteger(result.id)) {
                    session = req.session;
                    session.userid = result.id;
                    res.cookie({
                        maxAge: oneDay,
                        httpOnly: true
                    })
                    Admin.getUsers()
                        .then(usersResult => {
                            Admin.getMlnRaffle()
                                .then(raffleResult => {
                                    Admin.getVehicleRaffle()
                                        .then(vehicleResult => {
                                            Admin.getBoughtTickets()
                                                .then(ticketCount => {
                                                    Admin.getVehicleDrawCount()
                                                        .then(vehicleTicketCount => {
                                                            Admin.getMlnTicketCount()
                                                                .then(mlnTicketCount => {
                                                                    Admin.getSubscribers()
                                                                        .then(subscribers => {
                                                                            res.render(diagram, {
                                                                                title: 'Admin',
                                                                                usersCount: usersResult.length,
                                                                                mlnRaffle: raffleResult,
                                                                                vehicleResult,
                                                                                ticketCount: ticketCount.length,
                                                                                vehicleTicketCount: vehicleTicketCount.length,
                                                                                mlnTicketCount: mlnTicketCount.length,
                                                                                subscribers: subscribers.length
                                                                            })
                                                                        })
                                                                })
                                                        })
                                                        .catch(err => {
                                                            console.log(err)
                                                        })

                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })
                                        })
                                })
                        })
                }
            }
        })
        .catch(err => {
            if (err === false || err) {
                res.render(loginPage, {
                    title: 'Wrong email or password'
                })
            }
        })

}
/**Get users**/
exports.getAllUsers = (req, res) => {
    Admin.getAllUsersInfo()
        .then(result => {
            if (result.length >= 0) {
                res.render(usersList, {
                    title: 'WDF Users',
                    result
                })
            }
        })
        .catch(err => {
            if (err) return res.render(errPath, {
                title: 'Something gone wrong'
            })
        })
}
/**All bought tickets**/
exports.getBoughtTickets = (req, res) => {
    TicketTransfer.getBoughtTicketsAndRaffles()
        .then(result => {
            res.render(boughtTicketsPage, {
                title: 'Bought',
                result
            })
        })
}

/**Winners**/
exports.winners = (req, res) => {
    Winners.getVehicleSeriesNo()
        .then(vehicleSeriesNo => {
            Winners.getMlnSeriesNo()
                .then(mlnSeriesNo => {
                    Winners.getUserName()
                        .then(userFullName => {
                            res.render(winnerCreatorPath, {
                                title: 'Winners creator',
                                vehicleSeriesNo, mlnSeriesNo, userFullName
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })

}

/**Create winners**/
exports.createWinners = (req, res) => {
    let {seriesNo, fullName, ticketNo} = req.body;
    let {path} = req.file;
    Winners.getPreOrdersWithSerialNo(seriesNo)
        .then(drawInfo => {
            drawInfo.map(info => {
                Winners.getUserAllInfo(info.userId)
                    .then(userInfo => {
                        if (userInfo.firstName + ' ' + userInfo.lastName === fullName) {
                            Winners.getVehicleDrawLaunchDate(seriesNo)
                                .then(vehicleDrawLaunchDate => {
                                    if (vehicleDrawLaunchDate !== undefined) {
                                        Winners.getRaffleName(vehicleDrawLaunchDate.raffleId)
                                            .then(raffleName => {
                                                let winnerInfo = new Winners(vehicleDrawLaunchDate.id, userInfo.id, path, seriesNo, fullName, ticketNo, vehicleDrawLaunchDate.launchedTime, userInfo.nationality, raffleName.title);
                                                winnerInfo.createWinners()
                                                    .then(result => {
                                                        if (result > 0) {
                                                            Winners.getVehicleSeriesNo()
                                                                .then(vehicleSeriesNo => {
                                                                    Winners.getMlnSeriesNo()
                                                                        .then(mlnSeriesNo => {
                                                                            Winners.getUserName()
                                                                                .then(userFullName => {
                                                                                    res.render(winnerCreatorPath, {
                                                                                        title: 'Winners creator',
                                                                                        vehicleSeriesNo,
                                                                                        mlnSeriesNo,
                                                                                        userFullName
                                                                                    })
                                                                                })
                                                                                .catch(err => {
                                                                                    console.log(err)
                                                                                })
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
                                                        if (err.errno === 1062) {
                                                            Winners.getVehicleSeriesNo()
                                                                .then(vehicleSeriesNo => {
                                                                    Winners.getMlnSeriesNo()
                                                                        .then(mlnSeriesNo => {
                                                                            Winners.getUserName()
                                                                                .then(userFullName => {
                                                                                    res.render(winnerCreatorPath, {
                                                                                        title: 'Winners already exist',
                                                                                        vehicleSeriesNo,
                                                                                        mlnSeriesNo,
                                                                                        userFullName
                                                                                    })
                                                                                })
                                                                                .catch(err => {
                                                                                    console.log(err)
                                                                                })
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
                                            })
                                    } else {
                                        Winners.getMlnDrawLaunchDate(seriesNo)
                                            .then(mlnDrawLaunchDate => {
                                                Winners.getRaffleName(mlnDrawLaunchDate.raffleId)
                                                    .then(raffleName => {
                                                        let winnerInfo = new Winners(mlnDrawLaunchDate.id, userInfo.id, path, seriesNo, fullName, ticketNo, mlnDrawLaunchDate.launchedTime, userInfo.nationality, raffleName.title);
                                                        winnerInfo.createWinners()
                                                            .then(result => {
                                                                if (result > 0) {
                                                                    Winners.getVehicleSeriesNo()
                                                                        .then(vehicleSeriesNo => {
                                                                            Winners.getMlnSeriesNo()
                                                                                .then(mlnSeriesNo => {
                                                                                    Winners.getUserName()
                                                                                        .then(userFullName => {
                                                                                            res.render(winnerCreatorPath, {
                                                                                                title: 'Winners creator',
                                                                                                vehicleSeriesNo,
                                                                                                mlnSeriesNo,
                                                                                                userFullName
                                                                                            })
                                                                                        })
                                                                                        .catch(err => {
                                                                                            console.log(err)
                                                                                        })
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
                                                                if (err.errno === 1062) {
                                                                    Winners.getVehicleSeriesNo()
                                                                        .then(vehicleSeriesNo => {
                                                                            Winners.getMlnSeriesNo()
                                                                                .then(mlnSeriesNo => {
                                                                                    Winners.getUserName()
                                                                                        .then(userFullName => {
                                                                                            res.render(winnerCreatorPath, {
                                                                                                title: 'Winners already exist',
                                                                                                vehicleSeriesNo,
                                                                                                mlnSeriesNo,
                                                                                                userFullName
                                                                                            })
                                                                                        })
                                                                                        .catch(err => {
                                                                                            console.log(err)
                                                                                        })
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
                        } else {
                            console.log('We dont have winner with this name.')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })

        })
        .catch(err => {
            console.log(err)
        })
}

/**Transaction history**/
exports.getTransactionHistory = (req, res) => {
    IMPS.getIMPSPayment()
        .then(impsInfo => {
            UPI.getUPIPayments()
                .then(upiInfo => {
                    res.render(transactionHistoryPath, {
                        title: 'Transaction history',
                        impsInfo, upiInfo
                    })
                })
                .catch(err => {
                    if (err) {
                        return res.render(errPath, {
                            title: 'Something went wrong'
                        })
                    }
                })
        })
        .catch(err => {
            if (err) {
                return res.render(errPath, {
                    title: 'Something went wrong'
                })
            }
        })
}

/**Get winners**/
exports.getWinners = (req, res) => {
    Winners.getWinners()
        .then(winnersInfo => {
            res.render(getWinnersPath, {
                title: 'Winners',
                winnersInfo
            })
        })
        .catch(err => {
            console.log(err)
        })
}
/**Owner wallet info**/
exports.ownerInfo = (req, res) => {
    Admin.getOwnerInfo()
        .then(result => {
            res.render(ownerInfoPath, {
                title: 'Owner info',
                result
            })
        })
        .catch(err => {
            if (err) {
                return res.render(errPath, {
                    title: 'Something went wrong'
                })
            }
        })
}

/**Get Wallet Info For Edit**/
exports.getWalletInfoForEdit = (req, res) => {
    let {id, payMethod} = req.body;
    Admin.getOwnerWalletWithId(id)
        .then(walletInfo => {
            res.render(walletEditorPath, {
                title: 'Edite wallet',
                walletInfo
            })
        })
        .catch(err => {
            if (err) {
                res.render(errPath, {
                    title: 'Something went wrong'
                })
            }
        })
}

exports.confirmWalletEdits = (req, res) => {

    let {id, payMethod, vpaCode, accNo, ifscCode, holderName, bankName} = req.body;
    if (payMethod === 'UPI') {
        if (req.file === undefined) {
            Admin.getOwnerWalletWithId(id)
                .then(getUpiInfo => {
                    let upiInfo = [getUpiInfo.qrPath, vpaCode, id];
                    Admin.confirmWalletChanges(upiInfo)
                        .then(upiResult => {
                            if (upiResult === 'Wallet changed') {
                                Admin.getOwnerInfo()
                                    .then(result => {
                                        res.render(ownerInfoPath, {
                                            title: 'Owner info',
                                            result
                                        })
                                    })
                                    .catch(err => {
                                        if (err) {
                                            return res.render(errPath, {
                                                title: 'Something went wrong'
                                            })
                                        }
                                    })
                            }
                        })
                        .catch(err => {
                            if (err) {
                                res.render(errPath, {
                                    title: 'Something went wrong'
                                })
                            }
                        })
                })
        } else {
            let path = req.file.path;
            let upiInfo = [path, vpaCode, id];
            Admin.confirmWalletChanges(upiInfo)
                .then(upiResult => {
                    if (upiResult === 'Wallet changed') {
                        Admin.getOwnerInfo()
                            .then(result => {
                                res.render(ownerInfoPath, {
                                    title: 'Owner info',
                                    result
                                })
                            })
                            .catch(err => {
                                if (err) {
                                    return res.render(errPath, {
                                        title: 'Something went wrong'
                                    })
                                }
                            })
                    }
                })
                .catch(err => {
                    if (err) {
                        res.render(errPath, {
                            title: 'Something went wrong'
                        })
                    }
                })
        }

    } else if (payMethod === 'IMPS') {
        let walletInfo = [accNo, ifscCode, holderName, bankName, id]
        Admin.confirmUpiWalletChanges(walletInfo)
            .then(impsResult => {
                if (impsResult === 'Wallet changed') {
                    Admin.getOwnerInfo()
                        .then(result => {
                            res.render(ownerInfoPath, {
                                title: 'Owner info',
                                result
                            })
                        })
                        .catch(err => {
                            if (err) {
                                return res.render(errPath, {
                                    title: 'Something went wrong'
                                })
                            }
                        })
                }
            })
            .catch(err => {
                if (err) {
                    res.render(errPath, {
                        title: 'Something went wrong'
                    })
                }
            })

    }
}
/**Change Gateway Status**/
exports.changeGatewayStatus = (req, res) => {
    let {id, pg, status, refNo} = req.body;
    if (pg === 'IMPS') {
        let impsPayInfo = [status, id];
        Admin.changeImpsTransactionStatus(impsPayInfo)
            .then(impsDone => {
                if (impsDone === 'Payment confirmed') {
                    IMPS.getIMPSPayment()
                        .then(impsInfo => {
                            UPI.getUPIPayments()
                                .then(upiInfo => {
                                    if (status === 'Success') {
                                        let url = `${process.env.BASE_LOCALHOST_URL}/check_pay_status`;
                                        const options = {
                                            method: 'POST',
                                            url,
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                refId: refNo
                                            })
                                        };

                                        fetch(url, options)
                                            .then(res => res.json())
                                            .then(json => {
                                                if (json) {
                                                    res.render(transactionHistoryPath, {
                                                        title: 'Transaction history',
                                                        impsInfo, upiInfo
                                                    })
                                                }
                                            })
                                            .catch(err => console.error('error:' + err));

                                    } else {
                                        res.render(transactionHistoryPath, {
                                            title: 'Transaction history',
                                            impsInfo, upiInfo
                                        })
                                    }
                                })
                                .catch(err => {
                                    if (err) {
                                        return res.render(errPath, {
                                            title: 'Something went wrong'
                                        })
                                    }
                                })
                        })
                        .catch(err => {
                            if (err) {
                                return res.render(errPath, {
                                    title: 'Something went wrong'
                                })
                            }
                        })
                }
            })
            .catch(err => {
                if (err) {
                    res.render(errPath, {
                        title: 'Something went wrong'
                    })
                }
            })
    } else if (pg === 'UPI') {
        let upiPayInfo = [status, id];
        Admin.changeUpiTransactionStatus(upiPayInfo)
            .then(upiDone => {
                if (upiDone === 'Payment confirmed') {
                    IMPS.getIMPSPayment()
                        .then(impsInfo => {
                            UPI.getUPIPayments()
                                .then(upiInfo => {
                                    if (status === 'Success') {
                                        let url = `${process.env.BASE_LOCALHOST_URL}/check_pay_status`;
                                        const options = {
                                            method: 'POST',
                                            url,
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                refId: refNo
                                            })
                                        };

                                        fetch(url, options)
                                            .then(res => res.json())
                                            .then(json => {
                                                if (json) {
                                                    res.render(transactionHistoryPath, {
                                                        title: 'Transaction history',
                                                        impsInfo, upiInfo
                                                    })
                                                }
                                            })
                                            .catch(err => console.error('error:' + err));

                                    } else {
                                        res.render(transactionHistoryPath, {
                                            title: 'Transaction history',
                                            impsInfo, upiInfo
                                        })
                                    }
                                })
                                .catch(err => {
                                    if (err) {
                                        return res.render(errPath, {
                                            title: 'Something went wrong'
                                        })
                                    }
                                })
                        })
                        .catch(err => {
                            if (err) {
                                return res.render(errPath, {
                                    title: 'Something went wrong'
                                })
                            }
                        })
                }
            })
            .catch(err => {
                if (err) {
                    res.render(errPath, {
                        title: 'Something went wrong'
                    })
                }
            })
    }
}
/**Admin sign out**/
exports.signOut = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    }, 404)
}

