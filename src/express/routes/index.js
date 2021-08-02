const { Router } = require('express');
const router = new Router();

const index = [
  '/',
  'register',
  '/login',
  '/my',
  '/my/comments',
  '/articles/category/:id',
  '/articles/add',
  '/search',
  '/articles/edit/:id',
  '/articles/:id',
  '/categories '
];

index.forEach(mapRoute);

function mapRoute(route) {
  router.get(route, requestHandler)
}
function requestHandler(req, res) {
  res.send(req.url);
}

module.exports = router;
