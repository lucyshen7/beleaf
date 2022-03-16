const db = require('./index');

const getSpecies = () => {
  return db.query(`SELECT * FROM species`)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error fetching species: ' + err.message);
    });
};

module.exports = {
  getSpecies
};
