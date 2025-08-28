const { Router } = require('express');
const ctrl = require('../controllers/product.controller');
const { authenticated, requireRole } = require('../middlewares/auth');

const router = Router();

// ---------------Lectura: ambos roles autenticados---------------------
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos del inventario
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *                   lotNumber:
 *                     type: string
 *                     example: "L-001"
 *                   name:
 *                     type: string
 *                     example: "Teclado"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 20.00
 *                   quantityAvailable:
 *                     type: integer
 *                     example: 50
 *                   entryDate:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-01"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: No autenticado
 */
router.get('/', authenticated, ctrl.list);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autenticado
 */
router.get('/:id', authenticated, ctrl.get);

// -----------Solo ADMIN para mutaciones-------------------
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear nuevo producto (Solo ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lotNumber
 *               - name
 *               - price
 *               - quantityAvailable
 *               - entryDate
 *             properties:
 *               lotNumber:
 *                 type: string
 *                 example: "L-004"
 *               name:
 *                 type: string
 *                 example: "Monitor 24 pulgadas"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 199.99
 *               quantityAvailable:
 *                 type: integer
 *                 example: 25
 *               entryDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-10"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No tiene permisos de administrador
 */
router.post('/', authenticated, requireRole('ADMIN'), ctrl.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar producto (Solo ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lotNumber:
 *                 type: string
 *                 example: "L-001-UPDATED"
 *               name:
 *                 type: string
 *                 example: "Teclado Mecánico"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 25.50
 *               quantityAvailable:
 *                 type: integer
 *                 example: 45
 *               entryDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No tiene permisos de administrador
 */
router.put('/:id', authenticated, requireRole('ADMIN'), ctrl.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar producto (Solo ADMIN)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No tiene permisos de administrador
 */
router.delete('/:id', authenticated, requireRole('ADMIN'), ctrl.remove);

module.exports = router;
