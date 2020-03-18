const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will GET all promotion');
})
.post((req, res, next) => {
    res.end('Will CREATE all promotion');
})
.put((req, res, next) => {
    //res.statusCode = 403;
    res.end('Will UPDATE all promotion');
})
.delete((req, res, next) => {
    res.end('Will DELETE all promotion');
});

promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will GET the current promotion ', req.params.promoId);
})
.post((req, res, next) => {
    res.end('Will CREATE the current promotion ', req.params.promoId);
})
.put((req, res, next) => {
    res.end('Will UPDATE the current promotion ', req.params.promoId);
})
.delete((req, res, next) => {
    res.end('Will DELETE the current promotion ', req.params.promoId);
});

module.exports = promoRouter;