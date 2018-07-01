var express = require('express');
var router = express.Router();
var {
    db
} = require('../db/monk_config');

/* GET users listing. */
//http://localhost:3000/categories/add
router.get('/add', function (req, res, next) {

    res.render('addcategory.hbs', {
        title: 'Add Category'
    })

});


router.post('/add', function (req, res, next) {
    let categoryname = req.body.categoryname
    categoryname = categoryname.replace(/ /g,'')
    categoryname = categoryname.toLowerCase();
 
    //getting the blog_post collection from DB
    let blog_category_collec = db.get('blog_category');
    blog_category_collec.insert({
        name: categoryname

    }, (err, post) => {
        if (err) {
            res.send(err)
        } else {
            req.flash('success', 'Category addedd!');
            res.location('/posts/add');
            res.redirect('/posts/add');
        }
    })

});

//http://localhost:3000/categories/show/45421
router.get('/show/:categoryname', function (req, res, next) {
 //getting the blog_category collection from DB
 let blog_post_collec = db.get('blog_post');

 //getting the specific blog_post collection from DB
 //filtering/clausing by category field/property in blog_post collection
 blog_post_collec.find({category : req.params.categoryname }, {}, function (err, listOfCategories) {
   res.render('index.hbs', {
     title: req.params.categoryname,
     listBlogPost : listOfCategories
   })
 })
   

});


module.exports = router;