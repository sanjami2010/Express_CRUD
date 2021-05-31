const express = require('express');
const app = express();

const users = require('./users.json');
const posts = require('./posts.json');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
  res.send('Hello World!');
  console.log(req);
});
app.get('/books', function(req,res){
  res.send('there are four books in the store');
});
app.post('/', function(req, res){
  res.send('this is post request');
})
app.get('/users',  (req, res) => {
 return  res.json({users});
});

//fetch all the posts
app.get('/posts', (req, res) => {
  return res.json({ posts });
});


//Create new post into  posts.json file -mockup db
app.post('/posts', function (req, res) {
  console.log(req.body.newPost);
  //res.json(req.body.newPost);
  //save the post to the posts.json file (db)
  posts.push(req.body.newPost);
  //console.log({ posts });
  //rewrite posts.json
  let stringedData = JSON.stringify(posts,null,2);
  fs.writeFile('posts.json', stringedData, function (err) {
    if (err) {
      return res.status(500).json({ message: err})
    }
  }) 
  return res.status(200).json({ message: "new user created" });
})

//fetch single post
app.get('/posts/:id', function (req, res){
  let id = req.params.id;
let foundPost = posts.find(post => {
  return String(post.id) === id
  
  })
  console.log(foundPost);
  if (foundPost) {
    return res.status(200).json({ post: foundPost })
  }
  else {
    return res.status(404).json({ message:"Post not found" })
  }
 
})
//update single post---->not sure how to do this

app.put('/posts/:id', function (req, res) {
  let id = parseInt(req.params.id);
  let updatedPost = req.body;
  if (posts["post" + id] != null) {
    //update post
    posts["post" + id] = updatedPost;
   
    console.log("updated successfully" + JSON.stringify(updatedPost, null, 2));
    return res.end("updated successfully" + JSON.stringify(updatedPost, null, 2));
  }
  else {
    res.end("post doesn't exist" + JSON.stringify(updatedPost, null, 2));
  }
})




app.listen(8080, function(){
  console.log('server is up and running')
})