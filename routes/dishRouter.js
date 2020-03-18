const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will GET all dishes');
})
.post((req, res, next) => {
    res.end('Will CREATE all dishes');
})
.put((req, res, next) => {
    //res.statusCode = 403;
    res.end('Will UPDATE all dishes');
})
.delete((req, res, next) => {
    res.end('Will DELETE all dishes');
});

dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will GET the current dish ' + req.params.dishId);
})
.post((req, res, next) => {
    res.end('Will CREATE the current dish ' + req.params.dishId);
})
.put((req, res, next) => {
    //res.statusCode = 403;
    res.end('Will UPDATE the current dish ', + req.params.dishId);
})
.delete((req, res, next) => {
    res.end('Will DELETE the current dish ', + req.params.dishId);
});

module.exports = dishRouter;