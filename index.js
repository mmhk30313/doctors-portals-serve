//It's from (expressjs) by searching in google
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

//It's from (dotenv npm) by searching in google
require('dotenv').config();

//It's from (monogodb.com/Clusters/CONNECT) by searching in google
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tdo9r.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(process.env.DB_NAME);

//It's from by searching in google
//It's from (expressjs) by searching in google
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
    res.send("Hello Doctor-Portal-MongoDB! It's Working After Deploying Heroku...")
})

//It's from (monogodb.com/Clusters/CONNECT) by searching in google
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const appointmentCollection = client.db("doctorsPortals").collection("appointments");
    
    app.get('/appointments', (req, res) =>{
        // console.log('Hello')
        // res.send("Hello")
        appointmentCollection.find({})
        .toArray((err, documents) => {
            console.log(documents);
            res.send(documents);
        })
    })

    app.post('/addAppointment', (req,res) => {
        const appointment = req.body; 
        // console.log(appointment);
        appointmentCollection.insertOne(appointment)
        .then(result => {
            // console.log(result.ops);
            res.send(result.insertedCount > 0);
        })

    })

    app.post('/appointmentsByDate', (req,res) => {
        const date = req.body; 
        // console.log(date.date);
        appointmentCollection.find({date: date.date})
        .toArray((err, documents)=>{
            // console.log(documents);
            res.send(documents);
        })

    })
    
});

app.listen(process.env.PORT || port);