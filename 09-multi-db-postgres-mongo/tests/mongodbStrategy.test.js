const { equal, deepEqual, ok } = require('assert');
const MongoDBStrategy = require('../src/db/strategies/mongoDbStrategy');
const Context = require('../src/db/strategies/base/contextStrategy');
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };

const context = new Context(new MongoDBStrategy());
describe('MongoDB Strategy', () => {
  before(async () => {
    await context.connect();
  });

  it('verificar conexao', async () => {
    const result = await context.isConnected();
    const expected = 'Conectado';
    deepEqual(result, expected);
  });

  it('cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });
});
