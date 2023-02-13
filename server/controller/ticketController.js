const url = require('url');
const {validationResult} = require('express-validator');
const goToCreateTicketPath = ('../views/admin/createRaffle.ejs'),
    raffleCardPath = ('../views/raffles/getRaffleCard.ejs'),
    ticketsCardPath = ('../views/raffles/getSubTickets.ejs'),
    ticketsVehicleCardPath = ('../views/raffles/getTicketsVehicles.ejs'),
    mlnEditorPath = ('../views/raffles/mlnRaffleEditor.ejs'),
    errPath = ('../views/error/error.ejs');
const Raffle = require('../moduls/raffle.js'),
    MlnRaffle = require('../moduls/megaMln.js'),
    VehicleRaffle = require('../moduls/vehicleRaffles.js'),
    TicketTransfer = require('../moduls/ticketTransfer.js');

exports.createRafflePage = (req, res) => {
    res.render(goToCreateTicketPath, {
        title: 'Create raffle'
    })
}

/**Create raffle**/
exports.createRaffle = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const raffleArr = validationResult(req.body);
    if (!raffleArr.isEmpty()) {
        const raffleArrErr = raffleArr.array()[0].param
        if (raffleArrErr === 'path' || raffleArrErr === 'title' || raffleArrErr === 'title1'
            || raffleArrErr === 'date' || raffleArrErr === 'desc') {
            return res.redirect(url.format({
                query: {
                    error: raffleArrErr
                }
            }))
        }
    }
    if (req.body.title[0] === 'other') {
        let raffleInfo = new Raffle(req.file.path, req.body.title[1], req.body.date, req.body.desc);
        raffleInfo.createRaffle()
            .then(result => {
                Raffle.getRaffle(result)
                    .then(result => {
                        if (result.title === 'Surprise Car' || result.title === 'Surprise Bike') {
                            Raffle.getAllRaffles()
                                .then(result => {
                                    if (result) {
                                        res.render(raffleCardPath, {
                                            title: 'All raffles',
                                            result
                                        })
                                    }
                                })
                        } else if (result.title === 'Mega Millions') {
                            Raffle.getAllRaffles()
                                .then(result => {
                                    if (result) {
                                        res.render(raffleCardPath, {
                                            title: 'All raffles',
                                            result
                                        })
                                    }
                                })
                        } else {
                            Raffle.getAllRaffles()
                                .then(result => {
                                    if (result) {
                                        res.render(raffleCardPath, {
                                            title: 'All raffles',
                                            result
                                        })
                                    }
                                })
                        }
                    })
            })
            .catch(err => {
                if (err) return res.render(errPath, {
                    title: 'Something went wrong'
                })
            })
    } else {
        let raffleInfo = new Raffle(req.file.path, req.body.title[0], req.body.date, req.body.desc);
        raffleInfo.createRaffle()
            .then(result => {
                Raffle.getRaffle(result)
                    .then(result => {
                        if (result.title === 'Surprise Car' || result.title === 'Surprise Bike') {
                            Raffle.getAllRaffles()
                                .then(result => {
                                    if (result) {
                                        res.render(raffleCardPath, {
                                            title: 'All raffles',
                                            result
                                        })
                                    }
                                })
                        } else if (result.title === 'Mega Millions') {
                            Raffle.getAllRaffles()
                                .then(result => {
                                    if (result) {
                                        res.render(raffleCardPath, {
                                            title: 'All raffles',
                                            result
                                        })
                                    }
                                })
                        } else {
                            Raffle.getAllRaffles()
                                .then(result => {
                                    if (result) {
                                        res.render(raffleCardPath, {
                                            title: 'All raffles',
                                            result
                                        })
                                    }
                                })
                        }
                    })
            })
            .catch(err => {
                if (err) return res.render(errPath, {
                    title: 'Something went wrong'
                })
            })
    }
}


/**Get vehicle tickets**/
exports.getTickets = (req, res, next) => {
    if (!req.body) return res.sendStatus(404);
    const raffleArr = validationResult(req.body);
    if (!raffleArr.isEmpty()) {
        const raffleArrErr = raffleArr.array()[0].param
        if (raffleArrErr === 'id') {
            return res.redirect(url.format({
                query: {
                    error: raffleArrErr
                }
            }))
        }
    }
    let id = req.body.id;
    if (req.body.title === 'Surprise Car' || req.body.title === 'Surprise Bike') {
        return Raffle.getSubVehicleRaffle(id)
            .then(result => {
                return res.render(ticketsVehicleCardPath, {
                    title: 'Vehicle tickets',
                    params: result,
                    id: req.body.id
                })
            })
            .catch(err => {
                if (err) return res.render(errPath, {
                    title: 'Something gone wrong'
                })
            })
    } else if (req.body.title === 'Mega Millions') {
        return Raffle.getSubRaffle(id)
            .then(result => {
                return res.render(ticketsCardPath, {
                    title: 'Million`s tickets',
                    params: result,
                    id: req.body.id
                })
            })
            .catch(err => {
                if (err) return res.render(errPath, {
                    title: 'Something gone wrong'
                })
            })
    }

}

/**Edite million raffle**/
exports.editRaffles = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const ERIArr = validationResult(req.body);
    if (!ERIArr.isEmpty()) {
        const ERErr = ERIArr.array()[0].param
        if (ERErr === 'id') {
            return res.redirect(url.format({
                query: {
                    error: ERErr
                }
            }))
        }
    }

    let {id} = req.body;
    MlnRaffle.getMlnSubRaffle(id)
        .then(result => {
            res.render(mlnEditorPath, {
                title: 'Edit',
                params: result,
                hostname: process.env.BASE_LOCALHOST_URL
            })
        })
        .catch(err => {
            if (err) return res.render(errPath, {
                title: 'Something gone wrong'
            })
        })

}

/**Edit vehicle raffles**/
exports.editeVehicleInfo = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const VEIArr = validationResult(req.body);
    if (!VEIArr.isEmpty()) {
        const VEIErr = VEIArr.array()[0].param;
        if (VEIErr === 'id') {
            return res.redirect(url.format({
                query: {
                    error: VEIErr
                }
            }))
        }
    }

    let {id} = req.body;
    VehicleRaffle.getSelectedVehicleInfo(id)
        .then(result => {
            res.render(mlnEditorPath, {
                title: 'Edit',
                params: result,
                hostname: process.env.BASE_LOCALHOST_URL
            })
        })
        .catch(err => {

            if (err) return res.render(errPath, {
                title: 'Something gone wrong'
            })
        })
}


/**Confirming million raffle info**/
exports.confirmedInfo = (req, res) => {
    if (!req.body) res.sendStatus(404)
    const editArr = validationResult(req.body);
    if (!editArr.isEmpty()) {
        const editArrErr = editArr.array()[0].param;
        if (editArrErr === 'selectBox') {
            return res.redirect(url.format({
                query: {
                    error: editArrErr
                }
            }))
        }
    }

    let {selectBox, id, rafId, title, solution, subRaffleTitle} = req.body;

    let editableInfo = [selectBox, solution, subRaffleTitle, id];
    if (selectBox === undefined && title === 'Mega Millions') {
        let halfInfo = [solution, subRaffleTitle, id];
        MlnRaffle.changeMlnHalfInfo(halfInfo)
            .then(done => {
                if (done === 'Changed') {
                    MlnRaffle.getMlnSubRaffle(id)
                        .then(result => {
                            res.render(mlnEditorPath, {
                                title: 'Edit',
                                params: result,
                                hostname: process.env.BASE_LOCALHOST_URL
                            })
                        })
                        .catch(err => {
                            if (err) return res.render(errPath, {
                                title: 'Something went wrong'
                            })
                        })
                }
            })
            .catch(err => {
                if (err) return res.render(errPath, {
                    title: 'Something went wrong'
                })
            })

    } else if (selectBox === undefined && title === 'Surprise Car' || selectBox === undefined && title === 'Surprise Bike') {
        let {engine, capacity, output, transmission, exterior_color, interior_trim, wheels} = req.body
        let vehicleHalfInfo = [engine, capacity, output, transmission, exterior_color, interior_trim, wheels, id];
        VehicleRaffle.changeVehicleHalfInfo(vehicleHalfInfo)
            .then(done => {
                if (done === 'Info changed') {
                    VehicleRaffle.getSelectedVehicleInfo(id)
                        .then(result => {
                            res.render(mlnEditorPath, {
                                title: 'Edit',
                                params: result,
                                hostname: process.env.BASE_LOCALHOST_URL
                            })
                        })
                        .catch(err => {
                            if (err) return res.render(errPath, {
                                title: 'Something went wrong'
                            })
                        })
                }
            })

    } else if (title === 'Mega Millions') {
        MlnRaffle.changeMlnRaffleInfo(editableInfo)
            .then(result => {
                return Raffle.getSubRaffle(rafId)
                    .then(result => {
                        Raffle.getMlnSerialNo(rafId)
                            .then(safSubNo => {
                                let editInfo = [selectBox, safSubNo.seriesNo];
                                TicketTransfer.editPreOrderWithSerialNo(editInfo)
                                    .then(done => {
                                        if (done === true) {
                                            return res.render(ticketsCardPath, {
                                                title: 'Million`s tickets',
                                                params: result,
                                                id: req.body.id
                                            })
                                        }
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
            .catch(err => {
                if (err) return res.render(errPath, {
                    title: 'Something went wrong'
                })
            })
    } else if (title === 'Surprise Car' || title === 'Surprise Bike') {
        let {selectBox, engine, capacity, output, transmission, exterior_color, interior_trim, wheels,id} = req.body;
        let vehicleInfo = [selectBox, engine, capacity, output, transmission, exterior_color, interior_trim, wheels, id];
        VehicleRaffle.editVehicleRaffleInfo(vehicleInfo)
            .then(result => {
                return Raffle.getSubVehicleRaffle(rafId)
                    .then(result => {
                        Raffle.getVehicleRaffleSeriesNo(rafId)
                            .then(safSubNo => {
                                let editInfo = [selectBox, safSubNo.seriesNo];
                                TicketTransfer.editPreOrderWithSerialNo(editInfo)
                                    .then(done => {
                                        if (done === true) {
                                            return res.render(ticketsVehicleCardPath, {
                                                title: 'Vehicle tickets',
                                                params: result,
                                                id: req.body.id
                                            })
                                        }
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
            .catch(err => {
                if (err) return res.render(errPath, {
                    title: 'Something gone wrong'
                })
            })
    }

}


/**Delete Raffles**/
exports.deleteRaffles = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const DRTArr = validationResult(req.body);
    if (!DRTArr.isEmpty()) {
        const DRTErr = DRTArr.array()[0].param;
        if (DRTErr === 'id') {
            return res.redirect(url.format({
                query: {
                    error: DRTErr
                }
            }))
        }
    }
    let {id} = req.body;
    Raffle.deleteRaffles(id)
        .then(result => {
            Raffle.getAllRaffles()
                .then(result => {
                    if (result) {
                        res.render(raffleCardPath, {
                            title: 'All raffles',
                            result
                        })
                    }
                })
        })
        .catch(err => {
            if (err) return res.render(errPath, {
                title: 'Something gone wrong'
            })
        })
}
