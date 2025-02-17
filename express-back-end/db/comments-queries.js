const db = require('./index');

const getComments = () => {
  return db.query(`SELECT * FROM comments ORDER BY commented_at DESC;`)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error fetching posts: ' + err.message);
    });
};

const saveNewComment = (data) => {
  const { post_id, user_id, comment_text } = data;
  return db.query(
    `
    INSERT INTO comments(post_id, comment_user_id, comment_text, commented_at) VALUES ($1, $2, $3, $4) RETURNING *;
  `,

    [post_id, user_id, comment_text, new Date()]
  )

    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error inserting new comment: ' + err.message);
    });
};


module.exports = {
  getComments, saveNewComment
};