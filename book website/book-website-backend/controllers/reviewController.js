const Review = require('../models/Review');
const Book = require('../models/Book');

exports.createReview = async (req, res) => {
  try {
    const { book_id, rating, comment } = req.body;
    const newReview = await Review.create({
      user_id: req.user.id,
      book_id,
      rating,
      comment
    });
    
    // Update book's average rating
    const avgRating = await Review.calculateAverageRating(book_id);
    await Book.updateAverageRating(book_id, avgRating);
    
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.findByBookId(req.params.bookId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.update(
      req.params.reviewId,
      req.body
    );
    
    // Update book's average rating
    const avgRating = await Review.calculateAverageRating(updatedReview.book_id);
    await Book.updateAverageRating(updatedReview.book_id, avgRating);
    
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.delete(req.params.reviewId);
    
    // Update book's average rating
    const avgRating = await Review.calculateAverageRating(deletedReview.book_id);
    await Book.updateAverageRating(deletedReview.book_id, avgRating);
    
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};