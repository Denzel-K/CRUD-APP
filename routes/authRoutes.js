const { Router } = require ('express');
const authController = require ('../controller/authController');
const loadPages = require ('../controller/loadPages');
const router = Router();

router.get ('/', loadPages.home);
router.get ('/add', loadPages.add_get);
//router.get ('/update/:id', loadPages.update_get);
router.get ('/update', loadPages.update_get);

router.post ('/create', authController.create);
router.put ('/edit/:id', authController.edit);
router.delete ('/delete/:id', authController.delete);
router.get('/api/users', authController.find);

module.exports = router;