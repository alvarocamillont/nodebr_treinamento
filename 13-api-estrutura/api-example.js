const Hapi = require('hapi');
const Context = require('./src/db/strategies/base/contextStrategy');
const MongoDBStrategy = require('./src/db/strategies/mongodb/mongoDbStrategy');
const HeroisSchema = require('./src/db/strategies/mongodb/schemas/heroisSchema');
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
}

main();