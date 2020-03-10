const assert = require('assert');
const api = require('../api');
const PostgresStrategy = require('../db/strategies/postgres/postgresSQLStrategy');
const Context = require('../db/strategies/base/contextStrategy');
const UsuarioSchema = require('../db/strategies/postgres/schema/usuariosSchema');
const USER = {
  username: 'alvaro',
  password: 'Erick@32545545'
};

const USER_DB = {
  username: 'alvaro',
  password: '$2b$04$26QeBPFZYe/Uwpbkpd.Pse36n9zQIPHmlEIwkBHTHvJ4/sX2vU1Aq'
};

let app = {};
let context = {};

describe('Auth test suit', () => {
  before(async () => {
    app = await api;
    const connection = await PostgresStrategy.connect();
    const model = await PostgresStrategy.defineModel(connection, UsuarioSchema);
    context = new Context(new PostgresStrategy(connection, model));
    result = await context.update(null, USER_DB, true);
    console.log(result);
  });

  it('deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });

  it('deve retornar nao autorizado quando a senha estiver errada', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: { ...USER, password: 'sss' }
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 401);
    assert.deepEqual(dados.error, 'Unauthorized');
  });
});
