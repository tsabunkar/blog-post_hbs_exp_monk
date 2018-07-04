var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
  dest: './public/images'
})
var {
  db
} = require('../db/monk_config');
var moment = require('moment')
/* GET users listing. */
//http://localhost:3000/posts/add
router.get('/add', function (req, res, next) {
  //getting the blog_category collection from DB
  let blog_category_collec = db.get('blog_category');
  blog_category_collec.find({}, {}, function (err, listOfCategories) { //findall
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

//http://localhost:3000/posts/show/45543de
router.get('/show/:id', function (req, res, next) {
  console.log(req.params.id)
  //getting the blog_category collection from DB
  let blog_post_collec = db.get('blog_post');
  /*   blog_post_collec.findOne({_id : req.params.id}, function (err, singleBlogPostDocum) { 
      res.render('show.hbs', {
        title: 'Show Post',
        blogpost: singleBlogPostDocum
      })
    }) */


  //using promises instead of callback
  blog_post_collec.findOne({
      _id: req.params.id
    })
    .then((singleBlogPostDocum) => {

      singleBlogPostDocum.createdAt = moment(singleBlogPostDocum.createdAt).format("MMM Do YY, h:mm:ss a");
      // console.log(singleBlogPostDocum.comments.length);     
      if (singleBlogPostDocum.comments) { //if these statment is not used, 
        //then singleBlogPostDocum.comments -> will give undefine and we r doing undefine.map() which is an error 
        singleBlogPostDocum.comments.map(commentObj => {

          commentObj.commentedAt = moment(commentObj.commentedAt, "YYYYMMDD").fromNow();
        });
        singleBlogPostDocum.numberofcomments = singleBlogPostDocum.comments.length //adding new property to singleBlogPostDocum
      }
      res.render('show.hbs', {
        title: 'Show Post',
        blogpost: singleBlogPostDocum
      })
    }).catch((err) => {
      console.log(err);
    });




});


//POST request
//http://localhost:3000/posts/addcomment
router.post('/addcomment', function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let body = req.body.body;
  let commentedAt = new Date();
  let postId = req.body.postId; //this is the hidden field (which stores the ObjectId of the post)

  console.log(name, email, body, commentedAt, postId);
  //creating a comment object
  var comment = {
    name,
    email,
    body,
    commentedAt
  }
  //fetching Blog_post collection
  let blog_post_collec = db.get('blog_post');
  //updating the blog_post document with new property i.e-> comments object
  blog_post_collec.update({
    "_id": postId
  }, {
    $push: {
      comments: comment
    }
  }, (err, doc) => {
    if (err) throw err;
    else {
      console.log(doc);
      res.location('/posts/show/' + postId);
      res.redirect('/posts/show/' + postId);

    }
  });

});


module.exports = router;