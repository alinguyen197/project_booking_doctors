import multer from 'multer'
const path = require('path');
// cấu hình nơi lưu file tạm

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // thư mục lưu file
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // đặt tên file
    }
});
const update = multer({ storage: storage })

module.exports = update