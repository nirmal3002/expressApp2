const express = require('express');
const mongoose=require("mongoose");
const app = express();
const port = 3000;
monngoose.connect('mongodb://localhost/mydatabase',{usenewurlparse:true,useunifiedtopology:true});

const db=mongoose.connection
db.on("error",coonsole.log.bind(console,"mongodb error connection:"))
db.once("open", ()=>{
    console.log("connect to mongodb sucessfully");
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let books=[]
//post a book
    app.post("/books",(req,res)=>{
        const {title,author}=req.body;
        if (!title || !author) {
            return res.status(400).send('Missing title or author');
          }
          const newBook = { id: books.length + 1, title, author };
          books.push(newBook);
          res.status(201).send(newBook);
    })
    //get a book
    app.get('/books', (req, res) => {
        res.json(books);
      });
   
    //get a book by id
    app.get("/books/:id",(req,res)=>{
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
          return res.status(404).send('Book not found');
        }
        res.json(book);
      
    })
    //update a book by id 
    app.put("/books/:id",(req,res)=>{
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (!book) {
          return res.status(404).send('Book not found');
        }
        const{title,author}=req.body;
        book.title=title||book.title;
        book.author=author||books.author;

        res.send(books);
    })

  //delete a book by id
    app.delete("/books/:id",(req,res)=>{
        const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
    })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});