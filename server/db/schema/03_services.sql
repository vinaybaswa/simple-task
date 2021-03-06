DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  thumbnail_photo_url VARCHAR(255) NOT NULL
);