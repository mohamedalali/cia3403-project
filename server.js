var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Database Setup
var mongoose = require('mongoose');
mongoose.connect('mongodb://api:EBN8t9xg@ds255329.mlab.com:55329/spotsonclick');
var User = require('./app/models/user');
var Spot = require('./app/models/spot');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('public'))

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'This is a REST API endpoint for SpotsOnClick. Please use the appropriate route to use the resources.' });
});

router.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.username = req.body.username;
        user.display_name = req.body.display_name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function(err, user) {
            if (err) res.status(500).send(err);

            user.password = undefined;
            user = JSON.parse(JSON.stringify(user));

            res.status(201).json(user);
        });
    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) res.status(500).send(err);

            for (let user of users)
                user.password = undefined;

            users = JSON.parse(JSON.stringify(users));
                
            res.json(users);
        });
    });

router.route('/users/:id')
    .get(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) res.status(500).send(err);

            user.password = undefined;
            user = JSON.parse(JSON.stringify(user));
            
            res.json(user);
        });
    })
    .patch(function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) res.status(500).send(err);

            if (req.body._id) {
                req.body._id = undefined;
                req.body = JSON.parse(JSON.stringify(req.body));
            }

            for (let u in req.body) {
                user[u] = req.body[u];
            }

            user.save(function(err) {
                if (err) res.status(500).send(err);

                user.password = undefined;
                user = JSON.parse(JSON.stringify(user));

                res.json(user);
            });
        });
    })
    .delete(function(req, res) {
        User.remove({_id: req.params.id}, function(err, user) {
            if (err) res.status(500).send(err);

            res.status(204).json();
        });
    });

router.route('/spots')
    .post(function(req, res) {
        var spot = new Spot();
        spot.name = req.body.name;
        spot.description = req.body.description;
        spot.image_url = req.body.image_url;
        spot.city = req.body.city;
        spot.location = req.body.location;

        spot.save(function(err, spot) {
            if (err) res.status(500).send(err);

            res.status(201).json(spot);
        });
    })
    .get(function(req, res) {
        Spot.find(function(err, spots) {
            if (err) res.status(500).send(err);

            res.json(spots);
        });
    });

router.route('/spots/:id')
    .get(function(req, res) {
        Spot.findById(req.params.id, function(err, spot) {
            if (err) res.status(500).send(err);
            
            res.json(spot);
        });
    })
    .patch(function(req, res) {
        Spot.findById(req.params.id, function(err, spot) {
            if (err) res.status(500).send(err);

            if (req.body._id) {
                req.body._id = undefined;
                req.body = JSON.parse(JSON.stringify(req.body));
            }

            for (let s in req.body) {
                spot[s] = req.body[s];
            }

            spot.save(function(err) {
                if (err) res.status(500).send(err);

                res.json(spot);
            });
        });
    })
    .delete(function(req, res) {
        Spot.remove({_id: req.params.id}, function(err, spot) {
            if (err) res.status(500).send(err);

            res.status(204).json();
        });
    });

app.use('/api', router);

app.listen(port);
console.log('Server is listening on port ' + port + '...');