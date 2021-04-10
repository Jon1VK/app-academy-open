PRAGMA foreign_keys = ON;

DROP TABLE question_likes;
DROP TABLE replies;
DROP TABLE question_follows;
DROP TABLE questions;
DROP TABLE users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL
);

CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body VARCHAR(255) NOT NULL,
  author_id INTEGER NOT NULL,

  FOREIGN KEY (author_id) REFERENCES users (id)
);

CREATE TABLE question_follows (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  question_id INTEGER,

  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE replies (
  id INTEGER PRIMARY KEY,
  body VARCHAR(255),
  question_id INTEGER NOT NULL,
  parent_id INTEGER,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (question_id) REFERENCES questions (id),
  FOREIGN KEY (parent_id) REFERENCES replies (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE question_likes (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  question_id INTEGER,

  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

INSERT INTO
  users (fname, lname)
VALUES
  ('Joni', 'Vainio-Kaila'),
  ('Elli', 'Esimerkki'),
  ('Pate', 'Postimies')
;

INSERT INTO
  questions (title, body, author_id)
VALUES
  ('Question 1', 'LiiBaLaaba LiibaLaaba', 1),
  ('Question 2', 'LiiBaLaaba 2 Höpön Löpön', 1),
  ('Question 3', 'Höpön Löpön 3 LiibaLaaba', 3)
;

INSERT INTO
  question_follows (user_id, question_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 1),
  (3, 1),
  (3, 3)
;

INSERT INTO
  replies (body, question_id, parent_id, user_id)
VALUES
  ('Reply 1', 1, NULL, 2),
  ('Reply 2', 1, 1, 3),
  ('Reply 3', 1, 1, 1)
;

INSERT INTO
  question_likes (user_id, question_id)
VALUES
  (3, 1),
  (1, 1),
  (2, 1)
;