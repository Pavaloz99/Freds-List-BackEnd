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
router.get('/category/homeandbath', ctrl.posts.findCategoryHomeAndBath)
router.get('/category/beautyandhealth', ctrl.posts.findCategoryBeautyAndHealth)
router.get('/category/handmade', ctrl.posts.findCategoryHandmade)
router.get('/category/sports', ctrl.posts.findCategorySports)
router.get('/category/petsupplies', ctrl.posts.findCategoryPetSupplies)
router.get('/category/clothing', ctrl.posts.findCategoryClothing)
router.get('/category/toys', ctrl.posts.findCategoryToys)
router.delete('/:id/delete', ctrl.posts.drop)
router.get('/:id', ctrl.posts.grabOne)
router.put("/:id", upload.single('image'), ctrl.posts.editPost)


// exports
module.exports = router;