let Redis = require("ioredis");
let redis = new Redis(6379, 'redis');

async function routes (fastify, options) {

  // GET /runs/:id/test
  fastify.get('/:id/test', async (request, reply) => {
    let id = request.params.id;
    let test = await redis.spop(id);

    if (test) {
      reply.code(200);
      reply.send(test);
    } else {
      await redis.del(id);
      reply.code(410);
      reply.send('DONE');
    }
  });

  // POST /runs/
  // body => { id: '123', tests: ['foo.rb', 'bar.rb'] }
  fastify.post('/', async (request, reply) => {
    let id = request.body.id;
    let idExists = (await redis.keys(id)).length;

    if (idExists) {
      reply.code(406);
      reply.send('id already in use');
    } else {
      let tests = request.body.tests;
      await redis.sadd(id, tests);

      reply.code(201);
      reply.send({
        id: id,
        testsAdded: tests.length
      });
    }
  })

}

module.exports = routes;