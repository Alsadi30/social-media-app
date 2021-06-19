const Post = require('../models/Post');
const User = require('../models/User');

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

exports.postPostController = async (req, res, next) => {
  let post = req.body;
  let {body, tags, thumbnail} = post;

  const userId = req.userId;
  try {
    let newPost = new Post({
      body,
      tags,
      thumbnail,
      likes: [],
      comments: [],
      share: [],
      author: userId,
    });

    const createdPost = await newPost.save();

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

exports.getPostController = async (req, res, next) => {
  const userId = req.userId;

  if (userId) {
    try {
      let posts = await Post.find({author: userId});
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

exports.getPostUserController = async (req, res, next) => {
  let {id} = req.params;

  try {
    let user = await User.findById({_id: id});

    res.status(202).json({
      user,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

exports.getSinglePostController = async (req, res, next) => {
  let {_id} = req.params;
  
  console.log(_id)
  try {
    if (_id) {
      let post = await Post.findById({_id: _id});

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
    console.log(error);
  }
};

exports.updatePostController = async (req, res, next) => {
  let {id} = req.params;
  
    console.log(id)
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
      );
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
