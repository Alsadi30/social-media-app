const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Profile = require('../models/Profile');


//Post Thumbnail Upload
//api:/post/thumbnail

exports.postthumbnailController = async (req, res, next) => {
  const thumbnail = req.file?.filename;
  if (thumbnail) {
    res.status(201).json({
      thumbnail,
    });
  } else {
    res.status(500).json({
      error: 'thumbnail upload error',
    });
  }
};


// Post create Controller
//api:/post/

exports.postPostController = async (req, res, next) => {
  let post = req.body;
  let {body, tags, thumbnail} = post;

  const userId = req.userId;
  try {
    let newPost = new Post({
      body,
      tags,
      post:[],
      thumbnail,
      likes: [],
      comments: [],
      share: [],
      author: userId,
    })
    console.log(userId)

    const createdPost = await newPost.save()
                              
    let profile = await Profile.findOne({user: userId})
     
    profile.post.unshift(createdPost._id)
    
    await Profile.findOneAndUpdate({ user: userId }, { $set: profile })
    

    res.status(200).json({
      createdPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};



//Get post Controller
//api:/post/

exports.getPostController = async (req, res, next) => {
  const userId = req.userId;

  if (userId) {
    try {
      let posts = await Post.find()
        .populate('author', 'name profilePics')
        .populate({
          path: 'comment',
          populate: {
            path: 'user',
            select: 'name profilePics'
          }
        })
      let Posts =post.reverse()
      res.status(201).json({
        posts,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Server Error Ocured',
      });
    }
  } else {
    res.status(400).json({
      msg: 'You are not a valid User',
    });
  }
};

// exports.getPostUserController = async (req, res, next) => {
//   let {id} = req.params;

//   try {
//     let user = await User.findById({_id: id});

//     res.status(202).json({
//       user,
//     });
//   } catch (error) {
//     console.log(error.message);
//     next();
//   }
// };


//Get Single Detailed Post
//api:/post/:id

exports.getSinglePostController = async (req, res, next) => {
  let {_id} = req.params;
  
  console.log(_id)
  try {
    if (_id) {
      let post = await Post.findById({ _id: _id })
        .populate('comment','user body')

      res.status(200).json({
        post,
      });
    } else {
      res.status(400).json({
        msg: 'post not found',
      });
    }
  } catch (error) {
    res.json('Server error Occured in');
  }
};


//Update Post by Id
//api:/post/:id'

exports.updatePostController = async (req, res, next) => {
  let {id} = req.params;
  
  console.log(id)
  console.log(req.userId)
  let {body, tags, thumbnail} = req.body;

    let post = {}

  if (body) post.body = body;
  if (tags) post.tags = tags;
  if (thumbnail) post.thumbnail = thumbnail;

  try {
    let oldPost = await Post.findById({_id:id});
    if (oldPost.author == req.userId) {
      let newPost = await Post.findOneAndUpdate(
        {_id: id},
        {$set: post},
        {new: true}
      )
      .populate('author', 'name profilePics')
        .populate({
          path: 'comment',
          select: 'body createdAt',
          populate: {
            path: 'user',
            select: 'profilePics name'
          }
        })
      console.log(newPost)
      
      res.status(200).json({newPost});
    } else {
      res.status(400).json({
        msg: 'Post not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: 'Server Error Occured in Update',
    });
  }
};



//Delete Post by Id
//api:/post/:id

exports.deletePostController = async (req, res, next) => {
  let {id} = req.params;

  try {
    let post = await Post.findById({_id: id});
    if (post.author == req.userId) {
      await Post.findOneAndDelete({_id: id});
      res.status(200).json({msg: 'Post deleted Successfully', id});
    } else {
      res.status(400).json('Post not found');
    }
  } catch (error) {
    res.status(500).json('Server error Occured');
    console.log(error);
  }
};


//Give a Like
//api:/post/like

exports.addLikeController = async (req, res, next) => {
  
  let {id} = req.params

  let userId = req.userId

  try {
    if (!userId) {
      res.status(404).json({
        msg:'You are not an authenticated user'
      })
    }
    let post = await Post.findById({ _id: id })
              
   
    let index =  post.like.indexOf(userId)

    if (index === -1) {
      post.like.push(userId)
    } else {
      post.like.splice(index,1)
    }
    const updatedPost = await Post.findOneAndUpdate({ _id: id }, { $set: post }, { new: true })
      .populate('author', 'name profilePics')
      .populate({
        path: 'comment',
        select: 'body createdAt',
        populate: {
          path: 'user',
          select: 'profilePics name'
        }
      })
   
    res.status(200).json({
       updatedPost
    })

  } catch(error) {
      res.status(500).json('server error ocurred')
    }
}


//add a comment in a post
//api:/post/comment

exports.postCommentController = async (req,res,next) =>{
  let { id } = req.params
  let {body} = req.body
  let userId = req.userId
  
  if (!userId) {
    res.status(404).json('You are not an authenticated user')
  }

  try {
    let comment = new Comment({
      post: id,
      user: userId,
      body: body,
      replies:[]
    })
    
    let createdComment = await comment.save()

    let post = await Post.findById({_id: id})
    post.comment.push(createdComment._id)
  
    let updatedPost = await Post.findOneAndUpdate({ _id: id }, { $set: post }, { new: true })
    .populate('author', 'name profilePics')
        .populate({
          path: 'comment',
          select: 'body',
          populate: {
            path: 'user',
            select: 'name profilePics'
          }
        })
    res.status(201).json(updatedPost)

  }
  catch (e) {
    console.log(e)
  }

}