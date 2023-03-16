const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile } = require('../database/s3');



const upload = multer({
    dest: path.resolve(__dirname, '..', 'temp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'temp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 25
    },
    fileFilter: (req, file, cb) => {
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4'];
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});


  
class Upload {
    uploadFiles(req, res, next) {
        try {
            upload.array('campFiles', 10)(req, res, async function (err) {
                if (err) {
                    return res.status(400).send('Error while uploading files');
                }
                try {
                    const files = req.files;
                    let result = [];
                    for (let i = 0; i < files.length; i++) {
                        const file = await files[i];
                        result.push(file);
                        await unlinkFile(file.path);
                    }
                    req.body.campFiles = result;
                    next();
                } catch (error) {
                    res.status(500).send('ERROR AT UPLOAD');
                }
            });
        } catch (error) {
            res.status(500).send('ERROR AT UPLOAD');
        }
    }
}

module.exports = new Upload();