tags

  id, SERIAL PRIMARY KEY
  name, VARCHAR(255) UNIQUE NOT NULL

post_tags

  "postId", INTEGER REFERENCES post(id)
  "tagId", INTEGER REFERENCES TAG(id)
  Add a UNIQUE constraint on ("postId", "tagId")