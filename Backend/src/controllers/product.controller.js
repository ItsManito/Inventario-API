const { Product } = require('../../models');

//Exportar todos los productos
exports.list = async (_req, res, next) => {
  try {
    const items = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (err) { next(err); }
};

//Obtener un producto en especifico
exports.get = async (req, res, next) => {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) { next(err); }
};

//Crear producto
exports.create = async (req, res, next) => {
  try {
    const { lotNumber, name, price, quantityAvailable, entryDate } = req.body;
    if (!lotNumber || !name || price === undefined || quantityAvailable === undefined || !entryDate) {
      return res.status(400).json({ error: 'Campos requeridos: lotNumber, name, price, quantityAvailable, entryDate' });
    }
    const created = await Product.create({ lotNumber, name, price, quantityAvailable, entryDate });
    res.status(201).json(created);
  } catch (err) { next(err); }
};

//Actualizar producto
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Product.findByPk(id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    const { lotNumber, name, price, quantityAvailable, entryDate } = req.body;
    await item.update({ lotNumber, name, price, quantityAvailable, entryDate });
    res.json(item);
  } catch (err) { next(err); }
};


//Eliminar producto
exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Product.findByPk(id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    await item.destroy();
    res.json({ ok: true });
  } catch (err) { next(err); }
};
