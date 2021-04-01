const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: String,
})

const Person = mongoose.model('Person', personSchema)

const requestSchema = new mongoose.Schema({
  person: {
      type: mongoose.Schema.ObjectId,
      ref: 'Person',
  },
  requester: String,
  description: String,
  expires: String,
  id: Number,
});

const Request = mongoose.model('Request', requestSchema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// connect to the database
mongoose.connect('mongodb://localhost:27017/death', {
  useNewUrlParser: true
});

let id = 1;

app.post('/api/requests', async (req, res) => {
    let person = await Person.findOne({name: req.body.requester})

    if (!person) {
        person = new Person({
            name: req.body.requester,
        })
        await person.save();
    }

    //gotta do this to get the _id from mongo
    person = await Person.findOne({name: req.body.requester})
    console.log(req.body.expires);

    const request = new Request({   
        person: person,
        requester: req.body.requester,
        description: req.body.description,
        expires: req.body.expires,
        id: id,
    });

    try {
        await request.save();
        id++;
        res.send(request);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/requests', async (req, res) => {
  try {
    let requests = await Request.find();

    res.send(requests);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/requests/:id', async (req, res) => {
  try {
    await Request.deleteOne({
      id: req.params.id
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/requests/:id', async (req, res) => {
  try {
    let request = await Request.findOne({
        id: req.params.id
    })
    if (!request) {
        throw 'no request with that id';
    }

    if (req.body.requester && req.body.requester !== "") {
        let person = await Person.findOne({name: req.body.requester})
        if (!person) {
            person = new Person({
                name: req.body.requester,
            })
        }
        
        person = await Person.findOne({name: req.body.requester})

        request.person = person;
        request.requester = req.body.requester;
    }

    if (req.body.description && req.body.description !== "") {
        request.description = req.body.description;
    }

    if (req.body.expires && req.body.expires !== "") {
        request.expires = req.body.expires;
    }

    request.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(5000, () => console.log('Server listening on port 5000!'));
