const { Router } = require('express');
const ctrl = require('../controllers/product.controller');
const { authenticated, requireRole } = require('../middlewares/auth');

const router = Router();

// Lectura: ambos roles autenticados
router.get('/', authenticated, ctrl.list);
router.get('/:id', authenticated, ctrl.get);

// Solo ADMIN para mutaciones
router.post('/', authenticated, requireRole('ADMIN'), ctrl.create);
router.put('/:id', authenticated, requireRole('ADMIN'), ctrl.update);
router.delete('/:id', authenticated, requireRole('ADMIN'), ctrl.remove);

module.exports = router;
