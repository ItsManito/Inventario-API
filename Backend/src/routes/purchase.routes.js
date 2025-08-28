const { Router } = require('express');
const ctrl = require('../controllers/purchase.controller');
const { authenticated, requireRole } = require('../middlewares/auth');

const router = Router();

router.post('/purchases', authenticated, requireRole('CLIENT'), ctrl.createPurchase);
router.get('/purchases/me', authenticated, requireRole('CLIENT'), ctrl.myPurchases);
router.get('/admin/purchases', authenticated, requireRole('ADMIN'), ctrl.allPurchases);

module.exports = router;
