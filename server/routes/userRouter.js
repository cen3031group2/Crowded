/* Dependencies */
var user = require('../controllers/userController'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/create').post(user.createUser);
router.route('/save').post(user.saveUser);
router.route('/:username').get(user.getUserByName);
router.route('/').get(user.getUser);


router.param('username', user.toUsername);
module.exports = router;