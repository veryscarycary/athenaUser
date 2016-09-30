const router = require('../config/middleware.js').router();
const api = require('./controller.js');

// router.get('/api/search', api.getSearch);

router.get('/api/user', api.getUser);
router.get('/api/user/:id', api.getUser);


router.route('/api/user/:username/:password')
  .get(api.signin)
  .post(api.createUser)
  .put(api.editUser)
  .delete(api.deleteUser);

router.get('/', api.pingDb);

module.exports = router;
