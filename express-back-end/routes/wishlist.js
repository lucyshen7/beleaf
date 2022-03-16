const express = require('express');
const router  = express.Router();
const { insertWishlistPlant, getWishlist } = require('../db/wishlist-queries');

// GET wishlist table
router.get("/", (req, res) => {
  getWishlist()
    .then((wishlist) => {
      res.json({ wishlist });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST wishlist table
router.post("/", (req, res) => {
  insertWishlistPlant(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => console.log(error));
});

// export router object
module.exports = router;
