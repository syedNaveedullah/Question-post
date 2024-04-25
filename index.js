const express = require("express");
const path = require("path");
const app = express();
const port = 8080;


//these are used for ooverriding the method of forms coz they have only GET/POST so by this we can override it with PATCH/DELETE etc..
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

// import { v4 as uuidv4 } from 'uuid';  //yahan import nai us karsakte coz starting me express k liye require use kare toh is ko bhi require karna, import/require dono me se koi ek ich use kar sakte ek file me  
const { v4: uuidv4 } = require('uuid');


// post data ============================================
let posts = [
    {
        id : uuidv4(),
        username : "SyedNaveed",
        content : "anyone up for hackathon??"
    },
    {
        id : uuidv4(),
        username : "SyedNaveed",
        content : "What's up"
    },
    {
        id : uuidv4(),
        username : "Fahad",
        content : "How to get internship in FAANG "
    },
    {
        id : uuidv4(),
        username : "Mark Zukarburg",
        content : "Why Threads are flop"
    },
    {
        id : uuidv4(),
        username : "SyedNaveed",
        content : "Any help in web dev"
    },
    {
        id : uuidv4(),
        username : "Adam",
        content : "How to earn more"
    }
];


// to parse or access the post request data =========
app.use(express.urlencoded({extended: true}));

// setting view engine to ejs========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// setting static files path=======================
app.use(express.static(path.join(__dirname, "public")));

// starting the server=========================
app.listen(port, ()=>{
    console.log(`server is running on port : ${port}`);
});





// requsets and response--------------------------------------
// first main get request =========================
app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

// request to create new post ===================
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

//for adding post and also redirecting the page to main page 
app.post("/posts", (req,res)=>{
    let id = uuidv4();
    let {username, content} = req.body;
    // console.log(req.body);
    posts.push({ id, username,content });
    // res.send("Wait post is adding");
    res.redirect("/posts");
});

// for seeing post in detail
app.get("/posts/:id", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs", {post});
});



//for specific user's all posts 
app.get("/posts/user/:username", (req,res)=>{
    let { username } = req.params;
    let specificUser = [];
    
    for(postsearch of posts){
        if(postsearch.username == username){
            // console.log(postsearch);
            specificUser.push(postsearch);
        }
    }
    // console.log(specificUser);
    res.render("specificUser.ejs", {specificUser});
});

//patch req for editing post
app.patch("/posts/:id", (req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    
    // console.log(post);
    
    res.redirect("/posts");
})

//get req for rendering edit.ejs
app.get("/posts/:id/edit", (req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
})

//deleting the post 
app.delete("/post/:id", (req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
})