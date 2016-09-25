const router = require('../config/middleware.js').router();
const api = require('./controller.js');

router.route('/api/:username')
  .get(api.getUser);

// router.route('/api/user/:username/:password')
//   .get(api.checkAuth)
//   .post(api.createUser)
//   .put(api.editUser)
//   .delete(api.deleteUser);

router.get('/', (req, res) => {
  res.status(200).send();
})

module.exports = router;
