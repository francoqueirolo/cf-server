const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will GET all leader');
})
.post((req, res, next) => {
    res.end('Will CREATE all leader');
})
.put((req, res, next) => {
    //res.statusCode = 403;
    res.end('Will UPDATE all leader');
})
.delete((req, res, next) => {
    res.end('Will DELETE all leader');
});

leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will GET the current leader', req.params.leaderId);
})
.post((req, res, next) => {
    res.end('Will CREATE the current leader', req.params.leaderId);
})
.put((req, res, next) => {
    res.end('Will UPDATE the current leader', req.params.leaderId);
})
.delete((req, res, next) => {
    res.end('Will DELETE the current leader', req.params.leaderId);
});

module.exports = leaderRouter;