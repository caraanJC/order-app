const express = require('express')
const { viewAllOrders, createOder, collectionName } = require('./controller')
const router = express.Router()

const os = require('os')
const fs = require('fs');
const multer  = require('multer')
const fileFilter = (req, file, cb) => {
    const imageMimetypes = [
        'image/jpg',
        'image/jpeg', 
        'image/png', 
        'image/svg+xml'
    ]
    if (!imageMimetypes.includes(file.mimetype)) {
        return cb(new Error('Only images are allowed.'), false);
    }
    cb(null, true)
}

const filename = (req, file, cb) => {
    const datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
}

const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, os.tmpdir() + '\\order-app')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.originalname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

const upload = multer({ 
    storage,
    fileFilter
})

router.get('/viewAll', async (req, res) => {
    try {
        const data = await viewAllOrders()

        res.status(200).json(data)
    } catch (error) {
        error.collectionName = collectionName
        next(error)
    }
})

router.post('/add', upload.single('picture'),  async (req, res, next) => {
    try {
        const info = req.body

        if (req.file) {
            info.picture = req.file
        }

        const data = await createOder(info)

        res.status(200).json({
            message: "A menu has been added.",
            data
        })
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        error.collectionName = collectionName
        next(error)
    }
})

module.exports = router