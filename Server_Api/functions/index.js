const functions = require('firebase-functions');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');
var firebase = require('firebase');

app.use(cors())

var config = {
    apiKey: "AIzaSyCBZ63yVDoZEwlIYhRUgxOhIzPgpTXE0vI",
    authDomain: "java-88af9.firebaseapp.com",
    databaseURL: "https://java-88af9.firebaseio.com",
    projectId: "java-88af9",
    storageBucket: "java-88af9.appspot.com",
    messagingSenderId: "888298087576"
  };
  firebase.initializeApp(config);

exports.api = functions.https.onRequest(app)


router.route('/Onepiece')
    .post(function (req, res) { 
        Onepiece_name = req.body.name;
        Onepiece_id = req.body.id;
        firebase.database().ref('Onepiece/' + Onepiece_id).set({
            name: Onepiece_name,
            id: Onepiece_id
        });

        res.json({ message: 'Onepiece Add Finish!' });
    });

router.route('/Onepiece')
    .get(function (req, res) {
        var Onepiece_path = firebase.database().ref('Onepiece/');
        Onepiece_path.on('value', function (snapshot) {
            res.send(snapshot.val())
        });

    });

router.route('/Onepiece/:Onepiece_id')
    .get(function (req, res) {
        var id = req.params.Onepiece_id;
        var Onepiece_path = firebase.database().ref('/Onepiece/' + id)
        Onepiece_path.once('value', function (snapshot) {
            res.send(snapshot.val())
        });
    });

router.route('/Onepiece/:Onepiece_id')
    .put(function (req, res) {
        var id = req.params.Onepiece_id;
        var Onepiece_once_path = firebase.database().ref('/Onepiece/' + id)
        firebase.database().ref(Onepiece_once_path).update({
            name: req.body.name
        });
        res.json({ message: 'Onepiece Updated Finish!' });
    });

router.route('/Onepiece/:Onepiece_id')
    .delete(function (req, res) {
        var id = req.params.Onepiece_id;
        var Onepiece_once_path = firebase.database().ref('/Onepiece/' + id)
        firebase.database().ref(Onepiece_once_path).remove()
        res.json({ message: 'Onepiece deleted Finish!' });
        });

        app.use(bodyParser.json(), router);
        app.listen(8000);
