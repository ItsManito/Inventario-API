require('dotenv').config();
const app = require('./app');
const { sequelize } = require('../models');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos Conectada!!');
  } catch (err) {
    console.error('Error al conectar la Base de datos.', err.message);
  }
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
