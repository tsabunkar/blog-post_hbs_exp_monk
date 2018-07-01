var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
  dest: './public/images'
})
var {
  db
} = require('../db/monk_config');

/* GET users listing. */
////http://localhost:3000/posts/add
router.get('/add', function (req, res, next) {
  //getting the blog_category collection from DB
  let blog_category_collec = db.get('blog_category');
  blog_category_collec.find({}, {}, function (err, listOfCategories) {//findall
    res.render('addpost.hbs', {
      title: 'Add Post',
      listOfCategories
    })
  })


});

router.post('/add', upload.single('mainimage'), function (req, res, next) {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let author = firstname + lastname;
  let title = req.body.title;
  let createdAt = new Date();
  let category = req.body.category;
  let content = req.body.content;
  // console.log(req.file);
  if (req.file) {
    console.log('image uploaded successfully');
    var mainimage = req.file.filename;
  } else {
    console.log('not able to upload');
    var mainimage = 'noimage.jpg'
  }

  //getting the blog_post collection from DB
  let blog_post_collec = db.get('blog_post');
  blog_post_collec.insert({
    title,
    category,
    content,
    author,
    createdAt,
    mainimage

  }, (err, post) => {
    if (err) {
      res.send(err)
    } else {
      req.flash('success', 'Post addedd!');
      res.location('/');
      res.redirect('/');
    }
  })


  //  console.log(author,title,category,content,createdAt);
});

module.exports = router;