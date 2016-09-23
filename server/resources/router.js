const router = require('express').Router();
const api = require('./controller.js');

router.route('/api/user/:username')
  .get(api.getUser);

// router.route('/api/user/:username/:password')
//   .get(api.checkAuth)
//   .post(api.createUser)
//   .put(api.editUser)
//   .delete(api.deleteUser);

module.exports = router;
