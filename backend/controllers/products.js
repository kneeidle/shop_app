const Post = require('../models/Post');

exports.uploadProducts = async (req, res) => { //
  const product = new Post({
    image: req.body.image,
    title: req.body.title,
    desc: req.body.desc,
    price: req.body.price,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getAllProducts = async (req, res) => { //
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.deletePost = async (req, res) => { //
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({ _id: req.params.postId },
      { $set: { title: req.body.title } });
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
};
