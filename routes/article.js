const express = require('express');
const router = express.Router();
const Article = require('../db/models/article.schema');
const articleService = require('../services/article.service')(Article);
const validateUser = require('../helpers/user.validation').validateUser;

/* GET users listing. */
router.get('/featured', validateUser, async function(req, res, next) {
    try {
        let response = await articleService.getFeaturedArticles();
        res.json(response);
      } catch (error) {
        next(error)
      }
});

router.get('/nonfeatured', async function(req, res, next) {
    try {
        let response = await articleService.getNonFeaturedArticles();
        res.json(response);
      } catch (error) {
        next(error)
      }
});

router.post('/', async function(req, res, next) {
    const article = req.body;
    try {
        let response = await articleService.addNewArticle(article);
        res.json(response);
      } catch (error) {
        next(error)
      }
});


module.exports = router;