DROP TABLE IF EXISTS likes CASCADE;
CREATE TABLE likes ( 
  id SERIAL PRIMARY KEY NOT NULL,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);