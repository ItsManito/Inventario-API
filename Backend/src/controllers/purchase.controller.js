const { sequelize, Product, Purchase, PurchaseItem, User } = require('../../models');
const { Op } = require('sequelize');

exports.createPurchase = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { items } = req.body;

    // Validar items
    if (!Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Debes enviar items: [{ productId, quantity }]' });
    }

    let total = 0;
    const purchaseItems = [];

    // Procesar cada item de la compra
    for (const it of items) {
      const qty = Number(it.quantity);
      if (!it.productId || !qty || qty <= 0) {
        await t.rollback();
        return res.status(400).json({ error: 'Cada item requiere productId y quantity > 0' });
      }

      const product = await Product.findByPk(it.productId, { transaction: t, lock: t.LOCK.UPDATE });
      if (!product) {
        await t.rollback();
        return res.status(404).json({ error: `Producto ${it.productId} no existe` });
      }

      //verificar Stock
      if (product.quantityAvailable < qty) {
        await t.rollback();
        return res.status(400).json({ error: `Stock insuficiente para ${product.name}` });
      }

      //Calcular subtotal
      const price = Number(product.price);
      total += price * qty;

      // actualizar stock
      product.quantityAvailable = product.quantityAvailable - qty;
      await product.save({ transaction: t });

      //Preparar items para la compra
      purchaseItems.push({
        productId: product.id,
        quantity: qty,
        priceAtPurchase: price
      });
    }

    //Crear compra
    const purchase = await Purchase.create(
      { userId: req.user.id, totalPrice: total },
      { transaction: t }
    );

    //Crear los items de la compra
    for (const pi of purchaseItems) {
      await PurchaseItem.create({ ...pi, purchaseId: purchase.id }, { transaction: t });
    }

    await t.commit();

    // Buscar la compra completa con sus relaciones
    const created = await Purchase.findByPk(purchase.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, through: { attributes: ['quantity', 'priceAtPurchase'] } }
      ]
    });

    res.status(201).json(created);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

//Compras usuario autenticado
exports.myPurchases = async (req, res, next) => {
  try {
    const list = await Purchase.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      include: [{ model: Product, through: { attributes: ['quantity', 'priceAtPurchase'] } }]
    });
    res.json(list);
  } catch (err) { next(err); }
};

//Todas las compras (ADMIN)
exports.allPurchases = async (req, res, next) => {
  try {
    const { clientId, dateFrom, dateTo } = req.query;
    const where = {};
    if (clientId) where.userId = clientId;
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt[Op.gte] = new Date(dateFrom);
      if (dateTo) where.createdAt[Op.lte] = new Date(dateTo);
    }

    const list = await Purchase.findAll({
      where,
      order: [['createdAt', 'DESC']],
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Product, attributes: ['id', 'name', 'lotNumber'], through: { attributes: ['quantity', 'priceAtPurchase'] } }
      ]
    });
    res.json(list);
  } catch (err) { next(err); }
};
