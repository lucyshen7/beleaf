const express = require('express');
const router = express.Router();
const plantQueries = require('../db/plant-queries');

// GET user_plants table
router.get("/", (req, res) => {
  plantQueries.getPlants()
    .then((plants) => {
      res.json({ plants });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// UPDATE location of plants (POST to user_plants table)
router.post("/", (req, res) => {

  const { id, location } = req.body;
  
  plantQueries.updateLocation(id, location)
    .then((response) => {
      res.json({ response });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// export router object
module.exports = router;
