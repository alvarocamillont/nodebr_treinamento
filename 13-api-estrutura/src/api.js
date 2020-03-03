const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDBStrategy = require('./db/strategies/mongodb/mongoDbStrategy');
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('./routes/heroRoutes');
const app = new Hapi.Server({
  port:5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main(){
  const connection = MongoDBStrategy.connect();
  const context = new Context(new MongoDBStrategy(connection,HeroisSchema));
  app.route([
    ...mapRoutes(new HeroRoutes(context),HeroRoutes.methods())
  ])

  await app.start()
  console.log('Rodando na porta 5000')

  return app
}

module.exports = main();