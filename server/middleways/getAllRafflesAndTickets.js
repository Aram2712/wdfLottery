const Raffle = require('../moduls/raffle.js');
const raffleCardPath = ('../views/raffles/getRaffleCard.ejs'),
    raffleEditorPath = ('../views/raffles/raffleEditorPage.ejs'),
    errPath = ('../views/error/error.ejs');

/**Get raffles**/
exports.getRaffles = (req, res) => {
    Raffle.getAllRaffles()
        .then(result => {
            if (result) {
                res.render(raffleCardPath, {
                    title: 'All raffles',
                    result
                })
            }
        })
        .catch(err => {
            if (err) return res.render(errPath)
        })
}

/**Edit raffle info & img**/

exports.raffleEditorPage = (req, res) => {
    let {id} = req.body;
    Raffle.getRaffle(id)
        .then(result => {
            res.render(raffleEditorPath, {
                title: 'Edit raffle',
                result,
                hostname: process.env.BASE_LOCALHOST_URL
            })
        })
        .catch(err => {
            if (err) return res.render(errPath, {
                title: 'Something went wrong...'
            })
        })
}

/**Confirmed editable raffle infos**/
exports.confirmChangingInfo = (req, res) => {
    let {raffleId, description} = req.body;
    if (req.file === undefined) {

        let path = req.body.oldImage;

        let confirmedInfo = [path, description, raffleId];
        Raffle.editRaffleInfo(confirmedInfo)
            .then(result => {
                if (result === 'Raffle info changed') {
                    Raffle.getAllRaffles()
                        .then(result => {
                            if (result) {
                                res.render(raffleCardPath, {
                                    title: 'All raffles',
                                    result
                                })
                            }
                        })
                        .catch(err => {
                            if (err) return res.render(errPath)
                        })
                }
            })
            .catch(err => {
                if (err) {
                    if (err) return res.render(errPath, {
                        title: 'Something went wrong...'
                    })
                }
            })
    } else {
        let {path} = req.file;
        let confirmedInfo = [path, description, raffleId];
        Raffle.editRaffleInfo(confirmedInfo)
            .then(result => {
                if (result === 'Raffle info changed') {
                    Raffle.getAllRaffles()
                        .then(result => {
                            if (result) {
                                res.render(raffleCardPath, {
                                    title: 'All raffles',
                                    result
                                })
                            }
                        })
                        .catch(err => {
                            if (err) return res.render(errPath)
                        })
                }
            })
            .catch(err => {
                if (err) {
                    if (err) return res.render(errPath, {
                        title: 'Something went wrong...'
                    })
                }
            })
    }

}