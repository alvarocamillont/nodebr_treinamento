const Hapi = require('hapi');
const Context = require('../src/db/strategies/base/contextStrategy');
const MongoDBStrategy = require('../src/db/strategies/mongodb/mongoDbStrategy');
const HeroSchema = require('../src/db/strategies/mongodb/schemas/heroisSchema');
const HeroRoutes = require('../src/routes/heroRoutes');
const AuthRoutes = require('../src/routes/authRoutes');
const PostgresStrategy = require('../src/db/strategies/postgres/postgresSQLStrategy');
const UsuarioSchema = require('../src/db/strategies/postgres/schema/usuariosSchema');

const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const HapiJwt = require('hapi-auth-jwt2');

const JWT_SECRET = 'MEU_SEGREDAO';

const swaggerConfig = {
  info: {
    title: '#CursoNodeBR - API Herois',
    version: 'v1.0'
  },
  lang: 'pt'
};

const app = new Hapi.Server({
  port: 6000
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDBStrategy.connect();
  const context = new Context(new MongoDBStrategy(connection, HeroSchema));
  const connectionPostgres = await PostgresStrategy.connect();
  const modelUser = await PostgresStrategy.defineModel(connectionPostgres, UsuarioSchema);
  const contextPostgres = new Context(new PostgresStrategy(connectionPostgres, modelUser));

  await app.register([
    HapiJwt,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerConfig
    }
  ]);

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    //options: {
    //  expiresIn: 20
    //},
    validate: (dado, request) => {
      // verifica no banco se o usuário continua válido
      // verifica no banco se o usuário continua pagando
      return {
        isValid: true
      };
    }
  });

  app.auth.default('jwt');

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods())
  ]);

  await app.start();
  console.log('server running at', app.info.port);

  return app;
}
module.exports = main();
