const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const JWT_SECRET = process.env.JWT_SECRET || 'contraseñasupersecretabrm';

exports.authenticated = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const [, token] = header.split(' ');
    if (!token) return res.status(401).json({ error: 'No autorizado' });
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(payload.sub);
    if (!user) return res.status(401).json({ error: 'No autorizado' });
    req.user = { id: user.id, role: user.role, email: user.email, name: user.name };
    next();
  } catch (_err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

exports.requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'No autorizado' });
  if (req.user.role !== role) return res.status(403).json({ error: 'Prohibido' });
  next();
};
