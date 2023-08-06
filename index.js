const express =require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
mongoose.connect('mongodb://127.0.0.1:27017/ContactDance',{useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function () {    
    console.log("we are connected");
});

const port=8000;

//Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});
const Contact = mongoose.model('Contact',contactSchema);



//Express specific stuff
app.use('/static', express.static('static'));

//pug specific stuff
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

//Endpoints
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
});

app.post('/contact', (req,res)=>{
    const myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database ")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

//Starts the server
app.listen(port, () => {
    console.log(`The server is starts on port ${port}`)
});
