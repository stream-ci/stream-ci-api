let Redis = require("ioredis");
let redis = new Redis(6379, 'redis');

async function routes (fastify, options) {
  // GET /alive
  fastify.get('/alive', async (request, reply) => {
    reply.code(200);
    reply.send('OK');
  });

  // GET /ready
  fastify.get('/ready', async (request, reply) => {
    await redis.ping();

    reply.code(200);
    reply.send('OK');
  });
}

module.exports = routes;