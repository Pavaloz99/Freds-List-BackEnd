const router = require('express').Router()
const ctrl = require('../controllers');
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 16000000,
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
        return cb(new Error("File format is incorrect"));
        cb(undefined, true)
    } 
});


// routes
router.get('/', ctrl.posts.index)
router.post('/', upload.single('image'), ctrl.posts.create)
router.get('/category/electronics', ctrl.posts.findCategoryElectronics)
router.delete('/:id/delete', ctrl.posts.drop)
router.get('/:id', ctrl.posts.grabOne)
router.put("/:id", upload.single('image'), ctrl.posts.editPost)


// exports
module.exports = router;