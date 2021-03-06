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

router.route('/genre/add').post(user.addGenre);
router.route('/genre/remove').post(user.removeGenre);
router.route('/history/set').post(user.setHistory);
router.route('/history/clear').get(user.clearHistory);
router.route('/updatePassword').post(user.updatePassword);
router.route('/updateUsername').post(user.updateUsername);

router.param('username', user.toUsername);

router.addAvatarImage = user.addAvatarImage;
module.exports = router;
