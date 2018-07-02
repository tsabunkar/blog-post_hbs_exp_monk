var express = require('express');
var router = express.Router();
var {
  db
} = require('../db/monk_config');

/* GET home page. */
router.get('/', function (req, res, next) {

  //getting the blog_post collection from DB
  var blog_post_collec = db.get('blog_post'); //blog_post is collection /table name
  blog_post_collec.find({}, {}, function (err, alldocuments) {
    res.render('index', {
      listBlogPost: alldocuments
    });
  })

});

module.exports = router;