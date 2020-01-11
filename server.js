// IMPORTS
const fastify = require('fastify')({
  logger: true
});

// ROUTES
fastify.register(require('./routes/probes'));
fastify.register(require('./routes/runs'), { prefix: '/runs' });

// LISTENER
fastify.listen(3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    fastify.log.info(`server listening on ${address}`)
  }
});
