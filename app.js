//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "We are a platform where anyone can write their blogs and can publish blog on our platform freely and can share views on particular topic. A blog (a shortened version of “weblog”) is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject.";
const contactContent = "SERVICE TIMINGS:10AM TO 6PM";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];

app.get("/",function(req,res){
  res.render("home",{
    startingcontent: homeStartingContent,
    posts:posts
  });

});

app.get("/about",function(req,res){
  res.render("about",{aboutcontent: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactcontent: contactContent });
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post={
    title:req.body.postTitle,
    content:req.body.postbody
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postName",function(req,res){
  const requestedTitle=_.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
