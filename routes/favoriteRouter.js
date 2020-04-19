const express = require('express');
const bodyParser = require('body-parser');

const Favorites = require('../models/favorites');
const router = express.Router();

var authenticate = require('../authenticate');

router.use(bodyParser.json());

router.route('/favorites')
.get((req,res,next) => {
    Favorites.find({})
    .then((fav) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
  Favorites.create(req.body)
    .then((fav) => {
        console.log('Favorite Created ', fav);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favotites');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({})
    .then((fav) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/:favId')
.get((req,res,next) => {
    Favorites.findById(req.params.favId)
    .then((fav) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /favorites/'+ req.params.favId);
})
.put(authenticate.verifyAdmin, (req, res, next) => {
    Favorites.findByIdAndUpdate(req.params.favId, {
        $set: req.body
    }, { new: true })
    .then((fav) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyAdmin, (req, res, next) => {
    Favorites.findByIdAndRemove(req.params.favId)
    .then((fav) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(fav);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;
