const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//import models

const Post = require('./src/models/post');
const post = require('./src/models/post');
//define application
const app = express()

//define DB connection
const db=mongoose.connect('mongodb://localhost:27017/first-node-api')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',function(req,res){
    //handle the request for root route
    res.send({ping: 'pong'})
})

// app.get('.presentation',function(req,res){
//     //handle the request for presentation route
// })
//operations :create,read,update,delete
app.post('/posts',function(req,res){
    const title = req.body.title
    const author = req.body.author
    const content = req.body.content
    const post = new Post();
    post.title = title
    post.author = author
    post.content = content
    post.save(function(error, savedPost){
        if( error ) {
            res.status(500).send({ error:'Unable to save post' })
        }else{
            res.status(200).send(savedPost) 
        }
    })
    // res.send({title: title, author: author, content: content})
});

app.get('/posts',function(req,res){
    Post.find({},function(error,posts){
        if( error ) {
            res.status(564).send({ error:'Unable to find post' })
        }else{
            res.status(200).send(posts) 
        }
    })
})
//getting one post by id
app.get('/posts/:id',function(req,res){
    Post.findById(req.params.id,function(error,posts){
        if( error ) {
            res.status(500).send({ error:'Unable to find post' })
        }else{
            res.status(200).send(posts) 
        }
    })
})
//deleting the post by id.
app.delete('/posts/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id,function(error,posts){
        if( error ) {
            res.status(500).send({ error:'Unable to find post' })
        }else{
            res.status(200).send("deleted in posts") 
        } 
    })
  })
//updating the post by id
app.patch('/posts/:id',function(req,res){
    var id=req.params.id;
    Post.findByIdAndUpdate(id,{
        $set:{
            title:req.body.title,
            author:req.body.author,
            content:req.body.content
        }
    },function(error,posts){
        if( error ) {
            res.status(500).send({ error:'Unable to find post' })
        }else{
            res.status(200).send("updated in posts") 
        }
    })
})
app.listen(3001,function(){
    console.log('server is running at port 3001');
})
