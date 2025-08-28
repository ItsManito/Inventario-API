const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventario API',
      version: '1.0.0',
      description: 'API para sistema de inventario y gestión de compras',
      contact: {
        name: 'Jhonny Sebastian Ricardo Pesillo',
        email: 'seb.556se@gmail.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3000/api',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.json({ ok: true, name: 'Inventario API' }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Inventario API Documentation'
}));

app.use('/api', routes);

// Manejo de errores simple
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
