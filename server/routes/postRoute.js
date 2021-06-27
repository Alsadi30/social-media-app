const router = require('express').Router()
const {postthumbnailController, postPostController,getPostController,getPostUserController,getSinglePostController,updatePostController,deletePostController,addLikeController, postCommentController} = require('../controllers/postController')
const { authen } = require('../validator/authentication/authen')
const upload = require('../middlewares/uploadMiddleware')
    

router.post('/thumbnail', authen, upload.single('thumbnail'), postthumbnailController)
router.get('/', authen, getPostController)
router.get('/:id', authen, getSinglePostController)
router.post('/:id', authen, updatePostController)
router.delete('/:id',authen,deletePostController)
// router.get('/user/:id',authen ,getPostUserController)
router.post('/', authen , postPostController)
router.post('/like/:id',authen,addLikeController)
router.post('/comment/:id',authen,postCommentController)

module.exports = router