import { getControllersRoutes } from './src/routes';
import { connectToDb } from './src/DB/DBConnection';
const cors = require('@fastify/cors');
require('dotenv').config();

const fastify = require('fastify')({
  // logger: true,
});

// Enable CORS
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
});

fastify.get('/', async (req: any, res: any) => {
  res.send({ hello: 'Welcome To My API for NodeJS Challenge!' });
});

// mapeo las rutas y despues con el fastify.route las lanzo
getControllersRoutes.map((route) => {
  fastify.route(route);
});

// Connect to the database
connectToDb()
  .then(() => console.log('Connected to DB!'))
  .catch((error) => console.error('Error connecting to DB', error));

// Run the server!
const start = async () => {
  try {
    fastify.listen({ host: process.env.HOST || '0.0.0.0', port: process.env.PORT });
    console.log(` ------> Server listening on port => [${process.env.PORT}]`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
