const express = require("express");
const bodyParser = require("body-parser");
var authenticate = require("../authenticate");
const cors = require("./cors");

const Favorites = require("../models/favorites");

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .populate("user")
      .populate("dishes")
      .then(
        (favorites) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorites);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorites) => {
          if (favorites !== null) {
            for (var i = 0; i < req.body.length; i++) {
              if (favorites.dishes.indexOf(req.body[i]._id) === -1) {
                favorites.dishes.push(req.body[i]._id);
              }
            }
            favorites
              .save()
              .then((favorites) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorites);
              })
              .catch((err) => next(err));
          } else {
            var dishes = [];
            for (var i = 0; i < req.body.length; i++) {
              dishes.push(req.body[i]);
            }
            Favorites.create({ user: req.user._id, dishes: dishes })
              .then(
                (favorite) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(favorite);
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndDelete({ user: req.user._id })
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:dishId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /favorites/" + req.params.dishId);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorite) => {
          if (favorite !== null) {
            if (favorite.dishes.indexOf(req.params.dishId) === -1) {
              favorite.dishes.push(req.params.dishId);
            }
            favorite
              .save()
              .then((favorite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
              })
              .catch((err) => next(err));
          } else {
            var dishes = [];
            dishes.push(req.params.dishId);
            Favorites.create({ user: req.user._id, dishes: dishes })
              .then(
                (favorite) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(favorite);
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /favorites" + req.params.dishId);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (favorite) => {
          if (favorite !== null) {
            var index = favorite.dishes.indexOf(req.params.dishId);
            if (index >= 0) {
              favorite.dishes.splice(index, 1);
              favorite.save().then((favorite) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(favorite);
              });
            } else {
              var err = new Error(
                "Dish " + req.params.dishId + " not found in your favorites!"
              );
              err.status = 404;
              next(err);
            }
          } else {
            var err = new Error("Your favorite list does not exist!");
            err.status = 404;
            next(err);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;
