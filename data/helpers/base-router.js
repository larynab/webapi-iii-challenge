const express = require('express');

const Users = require('./userDb.js');
const Posts = require('./userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const users = await Users.get(req.query);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users',
      });
    }
  });

  router.get("/:userId", async (req, res) => {
    try {
        const user = await Posts.getUserPosts(req.query);
        res.status(200).json(user);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the user',
        });
      }
    });

module.exports = router;