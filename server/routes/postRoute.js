const router = require('express').Router()
const {postthumbnailController, postPostController,getPostController,getPostUserController,getSinglePostController,updatePostController,deletePostController} = require('../controllers/postController')
const { authen } = require('../validator/authentication/authen')
const upload = require('../middlewares/uploadMiddleware')
    

router.post('/thumbnail', authen, upload.single('thumbnail'), postthumbnailController)
router.get('/', authen, getPostController)
router.get('/:id', authen, getSinglePostController)
router.post('/:id', authen, updatePostController)
router.delete('/:id',authen,deletePostController)
router.get('/user/:id',authen ,getPostUserController)
router.post('/',authen,postPostController)


module.exports = router