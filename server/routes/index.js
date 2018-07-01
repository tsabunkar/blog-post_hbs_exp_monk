var express = require('express');
var router = express.Router();
var {
  db
} = require('../db/monk_config');

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = req.db;
  var alldocuments = db.get('blog_post');
  alldocuments.find({}, {}, function (err, alldocuments) {
    res.render('index', {
      listBlogPost: alldocuments
    });
  })

});

module.exports = router;