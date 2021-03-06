'use strict'

const db = require('APP/db')
const Review = db.model('reviews')

module.exports = require('express').Router()
  //User posts new review for a product
  .post('/', (req, res, next) => {
    return Review.create(req.body)
      .then(review => {
          res.sendStatus(201)
      })
      .catch(next)
  })
  //User(from account view) views all of their past reviews
  .get('/:userId', (req, res, next) => {
    Review.findAll({ where: { user_id: req.params.userId } })
      .then(foundReviews => res.json(foundReviews))
      .catch(next)
  })
  //User(from account view) deletes their past review
  .delete('/:reviewId', (req, res, next) => {
    Review.findById(req.params.reviewId)
      .then(foundReview => res.status(204).json(foundReview))
      .catch(next)
  })
