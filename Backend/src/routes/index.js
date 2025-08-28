const { Router } = require('express');
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const purchaseRoutes = require('./purchase.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/', purchaseRoutes);

module.exports = router;
