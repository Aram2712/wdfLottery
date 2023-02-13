const express = require('express');
const loginController = require('../controller/loginController.js'),
    registerController = require('../controller/registerController.js'),
    userController = require('../controller/userController.js'),
    adminController = require('../controller/adminController.js'),
    ticketController = require('../controller/ticketController.js'),
    vehicleCreatorController = require('../middleways/vehicleCreatorController.js'),
    createTicketController = require('../middleways/createTicketController.js'),
    getAllRafflesController = require('../middleways/getAllRafflesAndTickets.js'),
    mlnController = require('../middleways/mlnController.js');
const passport = require("passport");
const request = require('request');
require('./facebookAuth.js')
require('./googleAuth.js')
const multer = require("multer");
const verifyToken = require('./verifyToken.js');
const mainRouter = express.Router();
const fetch = require('node-fetch');
/**Upload image for users**/
const userImageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/usersImage")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + (file.originalname))
    }
});

const userImageFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const userImgLoader = multer({storage: userImageStorage, fileFilter: userImageFilter}).single('avatar');

/**USER Authenticate**/
mainRouter.post('/authentication', registerController.authentication);
mainRouter.post('/user_login', loginController.authorization);
mainRouter.post('/users_info_apply', verifyToken, userController.applyInfo);
mainRouter.get('/get_raffles', userController.getRaffles);
mainRouter.post('/million_raffle', userController.getMlnRaffle);
mainRouter.post('/vehicle_raffle_infos', userController.vehicleInfos);
mainRouter.post('/get_raffle&tickets', userController.getRafTick);
mainRouter.post('/upload_image', verifyToken, userImgLoader, userController.uploadImage);
mainRouter.post('/buy_tickets', userController.boughtTickets);
mainRouter.post('/send_bought_draws', verifyToken, userController.sendBoughtInfo);
mainRouter.post('/subscribe', userController.subscribeRequest);
mainRouter.get('/send_winners', userController.sendWinners);
mainRouter.post('/check_pay_status', userController.checkPayStatus);

/**UPI screenshot upload**/
const paymentImgStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/paymentScreenshots")
        console.log(file)
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + (file.originalname))
    }
});
const paymentImgFileFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const paymentImgLoader = multer({
    storage: paymentImgStorage,
    fileFilter: paymentImgFileFilter
}).single('paymentScreenshot');
mainRouter.post('/upload_payment_screenshot', paymentImgLoader, userController.uploadScreenshot);

/**Facebook authenticate**/
mainRouter.get('/auth/facebook', passport.authenticate('facebook',
    {authType: 'reauthenticate', scope: ['email', 'user_location']}));
mainRouter.get('/auth/facebook/continue',
    passport.authenticate('facebook', {failureRedirect: '/'}),
    function (req, res) {
        let user = req.user;
        res.send(user)
    }
);
/**Google authenticate**/
mainRouter.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
mainRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
    function (req, res) {
        const user = req.user
        res.send(user)
    });

/**Restore password**/
mainRouter.post('/restore_password', userController.restorePassword);
mainRouter.post('/update_password', userController.updatePassword);


/**Admin functionality**/
mainRouter.get('/', adminController.loginPage);
mainRouter.post('/main_page', adminController.mainPage);
mainRouter.post('/administrator_login', adminController.adminLogin);
mainRouter.post('/users', adminController.getAllUsers);
mainRouter.post('/create_ticket', ticketController.createRafflePage);
mainRouter.post('/delete_raffles', ticketController.deleteRaffles);
mainRouter.post('/get_bought_tickets', adminController.getBoughtTickets);
mainRouter.post('/winners', adminController.winners);
mainRouter.post('/get_winners', adminController.getWinners);
mainRouter.post('/transaction_history', adminController.getTransactionHistory);
mainRouter.post('/owner_wallet', adminController.ownerInfo);
mainRouter.post('/edit_wallet_info', adminController.getWalletInfoForEdit);
mainRouter.post('/change_gateway_status',adminController.changeGatewayStatus);
/**Confirm wallet changes**/
const walletQrStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/ownerUPIQR")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + (file.originalname))
    }
});

const qrFileFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upiQrLoader = multer({storage: walletQrStorage, fileFilter: qrFileFilter}).single('upiQr')
mainRouter.post('/confirm_editing_wallet', upiQrLoader, adminController.confirmWalletEdits);

/**Winner img loader**/
const winnerImgStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/winnersImage")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + (file.originalname))
    }
});

const winnerImgFileFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const loadWinnerImg = (multer({storage: winnerImgStorage, fileFilter: winnerImgFileFilter}).single('winnerImg'));
mainRouter.post('/create_winner_info', loadWinnerImg, adminController.createWinners);

/**Raffle creating function**/
const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/raffleImages")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + (file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const loader = multer({storage: storageConfig, fileFilter: fileFilter}).single('raffleImg');
mainRouter.post('/create_raffle', loader, ticketController.createRaffle);

/**Sub raffle for vehicles**/
mainRouter.post('/create_vehicle_raffle', vehicleCreatorController.createVehicle);

const vehicleImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/vehicleImages')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + (file.originalname))
    }
})
const vehicleImgFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const vehicleLoader = multer({storage: vehicleImageStorage, fileFilter: vehicleImgFilter}).single('vehicleImg');
mainRouter.post('/create_vehicle_sub_raffle', vehicleLoader, vehicleCreatorController.createVehicleRaffle);
/**Create mega mln raffle**/

const mlnImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/mlnImg')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + (file.originalname))
    }
})
const mlnImgFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const mlnLoader = multer({storage: mlnImageStorage, fileFilter: mlnImgFilter}).single('mlnImg');
mainRouter.post('/create_million', mlnLoader, mlnController.createMlnRaffle);

/**Create tickets**/
mainRouter.post('/create_tickets_vehicle', createTicketController.createTickets);
mainRouter.post('/create_tickets_remaining', createTicketController.createRemainingTickets);

/**Get/edit raffles and tickets**/
mainRouter.post('/get_raffles', getAllRafflesController.getRaffles);
mainRouter.post('/get_tickets', ticketController.getTickets);
mainRouter.post('/edit_mln_raffle', ticketController.editRaffles);

const mlnRaffleImgEditing = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/mlnImg')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + (file.originalname))
    }
})

const mlnEditedImgType = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const mlnEditedImgLoader = multer({
    storageConfig: mlnRaffleImgEditing,
    fileFilter: mlnEditedImgType
}).single('newMlnRaffleImg');

mainRouter.post('/confirm_mln_raffle_editing', mlnEditedImgLoader, ticketController.confirmedInfo);
mainRouter.post('/edit_vehicle_raffle', ticketController.editeVehicleInfo);
mainRouter.post('/edit_raffle', getAllRafflesController.raffleEditorPage);

/**Edite raffle info**/
const raffleEditedImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/raffleImages')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + (file.originalname))
    }
})

const raffleEditedImageFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg` ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const editedRaffleInfoLoader = multer({
    storage: raffleEditedImage,
    fileFilter: raffleEditedImageFilter
}).single('newRaffleImg')
mainRouter.post('/send_changed_info', editedRaffleInfoLoader, getAllRafflesController.confirmChangingInfo)

/**Delete raffle**/
mainRouter.post('/delete_vehicle_sub_raffle', vehicleCreatorController.deleteRaffle);
mainRouter.post('/delete_mln_sub_raffle', mlnController.deleteMlnRaffle)
/**Sign out**/
mainRouter.post('/sign_out', adminController.signOut);


module.exports = mainRouter;
