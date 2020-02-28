const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDBStrategy = require('./db/strategies/mongodb/mongoDbStrategy');
const HeroisSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const app = new Hapi.Server({
  port:5000
})

async function main(){
  const connection = MongoDBStrategy.connect();
  const context = new Context(new MongoDBStrategy(connection,HeroisSchema));
  app.route([
    {
      path:'/herois',
      method:'GET',
      handler:(request, head)=>{
        return context.read()
      }
    }
  ])

  await app.start()
  console.log('Rodando na porta 5000')

  return app
}

module.exports = main();