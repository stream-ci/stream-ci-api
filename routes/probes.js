let Redis = require("ioredis");
let redis = new Redis(6379, 'redis');

async function routes (fastify, options) {
  // GET /alive
  fastify.get('/alive', async (req, res) => {
    res.send('OK');
  });

  // GET /ready
  fastify.get('/ready', async (req, res) => {
    await redis.ping();

    res.send('OK');
  });
}

module.exports = routes;