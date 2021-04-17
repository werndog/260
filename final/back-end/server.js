const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;


const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
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

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use("/api/users", users.routes);


// connect to the database
mongoose.connect('mongodb://localhost:27017/death', {
  useNewUrlParser: true
});

app.post('/api/requests', validUser, async (req, res) => {
  console.log("user", req.user);
    const request = new Request({   
        user: req.user,
        description: req.body.description,
        expires: req.body.expires,
        id: req.user.count,
    });

    try {
        await request.save();
        req.user.count++;
        await req.user.save();
        res.send(request);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/requests', validUser, async (req, res) => {
  try {
    let requests = await Request.find({
      user: req.user
    }).sort({
      id: 1
    }).populate('user');

    res.send(requests);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/requests/:id', validUser, async (req, res) => {
  try {
    await Request.deleteOne({
      user: req.user,
      id: req.params.id
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.put('/api/requests/:id', validUser, async (req, res) => {
  try {
    let request = await Request.findOne({
        user: req.user,
        id: req.params.id
    })
    if (!request) {
        throw 'no request with that id';
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
