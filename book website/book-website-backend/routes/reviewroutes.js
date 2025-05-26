const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, reviewController.createReview);
router.get('/book/:bookId', reviewController.getBookReviews);
router.put('/:reviewId', authMiddleware, reviewController.updateReview);
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

module.exports = router;