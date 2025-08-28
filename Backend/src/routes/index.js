const { Router } = require('express');
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const purchaseRoutes = require('./purchase.routes');

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         lotNumber:
 *           type: string
 *         name:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         quantityAvailable:
 *           type: integer
 *         entryDate:
 *           type: string
 *           format: date
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

//-----------RUTAS----------------
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/', purchaseRoutes);

module.exports = router;
