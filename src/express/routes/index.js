'use strict';

const {Router} = require(`express`);
const router = new Router();

const routes = [
  `main`,
  `404`,
  `500`,
  `admin-add-new-post`,
  `post`,
  `all-categories`,
  `comments`,
  `my`,
  `main`,
  `main-empty`,
  `main-no-comments`,
  `main-page-admin-pager`,
  `main-variation`,
  `login`,
  `sign-up`,
  `search-1`,
  `search-2`,
  `search-3`,
  `post-detail`,
  `articles-by-category`
];

registerRoutes();

function registerRoutes() {
  routes.forEach(path => {
    router.get(`/${path}`, (req, res) => {
      res.render(`${path}`);
    });
  });
}

module.exports = router;
