const { Router } = require('express');
const ctrl = require('../controllers/purchase.controller');
const { authenticated, requireRole } = require('../middlewares/auth');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Gestión de compras y órdenes
 */

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Crear una nueva compra (Solo CLIENT)
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 totalPrice:
 *                   type: number
 *                   format: float
 *                   example: 40.00
 *                 userId:
 *                   type: integer
 *                   example: 2
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 User:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: "Cliente Ejemplo"
 *                     email:
 *                       type: string
 *                       example: "cliente@ejemplo.com"
 *                 Products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Teclado"
 *                       PurchaseItem:
 *                         type: object
 *                         properties:
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           priceAtPurchase:
 *                             type: number
 *                             format: float
 *                             example: 20.00
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No tiene permisos de cliente
 *       404:
 *         description: Producto no encontrado
 */
router.post('/purchases', authenticated, requireRole('CLIENT'), ctrl.createPurchase);

/**
 * @swagger
 * /purchases/me:
 *   get:
 *     summary: Obtener mis compras (Solo CLIENT)
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de compras del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   totalPrice:
 *                     type: number
 *                     format: float
 *                     example: 40.00
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   Products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Teclado"
 *                         PurchaseItem:
 *                           type: object
 *                           properties:
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             priceAtPurchase:
 *                               type: number
 *                               format: float
 *                               example: 20.00
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No tiene permisos de cliente
 */
router.get('/purchases/me', authenticated, requireRole('CLIENT'), ctrl.myPurchases);

/**
 * @swagger
 * /admin/purchases:
 *   get:
 *     summary: Obtener todas las compras (Solo ADMIN)
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de cliente
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar desde fecha (YYYY-MM-DD)
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtrar hasta fecha (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de todas las compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   totalPrice:
 *                     type: number
 *                     format: float
 *                     example: 40.00
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   User:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: "Cliente Ejemplo"
 *                       email:
 *                         type: string
 *                         example: "cliente@ejemplo.com"
 *                   Products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Teclado"
 *                         lotNumber:
 *                           type: string
 *                           example: "L-001"
 *                         PurchaseItem:
 *                           type: object
 *                           properties:
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             priceAtPurchase:
 *                               type: number
 *                               format: float
 *                               example: 20.00
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No tiene permisos de administrador
 */
router.get('/admin/purchases', authenticated, requireRole('ADMIN'), ctrl.allPurchases);

module.exports = router;
