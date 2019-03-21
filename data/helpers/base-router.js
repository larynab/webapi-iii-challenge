const express = require('express');

const userdb = require('./userDb.js');
const postdb = require('./userDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const users = await userdb.get(req.query);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users',
      });
    }
  });

  router.get("/posts/:userId", async (req, res) => {
      const {userId} = req.params;
    try {
        const user = await userdb.getUserPosts(userId);
        res.status(200).json(user);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the user',
        });
      }
    });

module.exports = router;