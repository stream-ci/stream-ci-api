let Redis = require("ioredis");
let redis = new Redis(6379, 'redis');

async function routes (fastify, options) {
  // GET /runs/:id/test
  fastify.get('/:id/test', async (req, res) => {
    let id = req.params.id;
    let test = await redis.spop(id);

    res.send(test);
  });

  // POST /runs/
  // body => { id: '123', tests: ['foo.rb', 'bar.rb'] }
  fastify.post('/', async (req, res) => {
    let id = req.body.id;
    let tests = req.body.tests;

    await redis.sadd(id, tests);

    res.send({
      id: id,
      testsAdded: tests.length
    });
  })
}

module.exports = routes;