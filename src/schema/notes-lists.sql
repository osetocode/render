DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS notes;

CREATE TABLE lists(
  id serial PRIMARY KEY,
  title text NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notes(
  id serial,
  content text NOT NULL,
  id_list int REFERENCES lists(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);