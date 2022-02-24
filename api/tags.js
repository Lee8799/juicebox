const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db/index");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const response = await getPostsByTagName(tagName);
    const posts = response.filter(post => {
        if (post.active === true || (req.user !== undefined && req.user.id === post.author.id) ) {
            return true
        } 
     
    });
    res.send({ posts: posts });
    
  } catch ({ name, message }) {
    next({ name: name, message: message });
    // forward to error handler
  }
});

module.exports = tagsRouter;