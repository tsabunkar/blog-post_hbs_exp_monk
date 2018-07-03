var express = require('express');
var router = express.Router();
var {
  db
} = require('../db/monk_config');
var moment = require('moment');
/* GET home page. */
router.get('/', function (req, res, next) {

  //getting the blog_post collection from DB
  var blog_post_collec = db.get('blog_post'); //blog_post is collection /table name
  /*   blog_post_collec.find({}, {}, function (err, alldocuments) {
      res.render('index', {
        listBlogPost: alldocuments
      });
    }) */

    
  //using promises instead of callback
  blog_post_collec.find({}, {}).then((alldocuments) => {
    // console.log(JSON.stringify(alldocuments,undefined,2));
    alldocuments.map(individaulDoc => {
      individaulDoc.createdAt = moment(individaulDoc.createdAt).format("MMM Do YY, h:mm:ss a");
    })
    res.render('index.hbs', {
      listBlogPost: alldocuments
    })
  }).catch((err) => {

  });


});

module.exports = router;