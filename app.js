const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my blog. If you want to share a thought or two, please visit the compose section.";
const aboutContent = "This blog is created only for one purpose, to pour your souls out. Share your concerns, thoughts, ideas or just ask something that bothers you. All of this is completely confidential, so don't hesitate and make your first post now. I hope, that this blog is going to be your new online diary.";
const contactContent = "You can reach me at:"

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});





app.get("/posts/:postName", function (req, res) {
  posts.forEach(post => {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.postName)) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
