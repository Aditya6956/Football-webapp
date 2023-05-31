const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/', teamController.view);
router.post('/', teamController.find);
router.get('/addteam', teamController.form);
router.post('/addteam', teamController.create);
router.get('/editteam/:id', teamController.edit);
router.post('/editteam/:id', teamController.update);
router.get('/viewteam/:id', teamController.viewall);
router.get('/:id',teamController.delete);
  
module.exports = router;
