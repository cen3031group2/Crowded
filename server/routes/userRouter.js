/* Dependencies */
var user = require('../controllers/userController'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/genre/get')
    .post(user.getGenres);
router.route('/genre/set')
    .post(user.setGenres);

router.route('/history/get')
    .post(user.getHistory);
router.route('/history/add')
    .post(user.addHistory);

router.route('/password/check')
    .post(user.checkPassword);
router.route('/password/set')
    .post(user.setPassword);

router.route('/get')
    .post(user.getUser);
router.route('/create')
    .post(user.create);

router.route('/company/get')
    .post(user.getCompany);

module.exports = router;