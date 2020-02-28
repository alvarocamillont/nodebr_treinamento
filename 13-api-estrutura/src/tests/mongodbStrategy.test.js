const { equal, deepEqual, ok } = require('assert');
const MongoDBStrategy = require('../db/strategies/mongodb/mongoDbStrategy');
const Context = require('../db/strategies/base/contextStrategy');
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'flexas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Mulher Gavião', poder: 'grito' };
const MOCK_HEROI_DEFAULT = { nome: `Homem Aranha-${Date.now()}`, poder: 'Super Teia' };
const HeroisSchema = require('../db/strategies/mongodb/schemas/heroisSchema');

let MOCK_HEROI_ID = '';

let context = {};
describe('MongoDB Strategy', () => {
  before(async () => {
    const connection = MongoDBStrategy.connect()
    context = new Context(new MongoDBStrategy(connection,HeroisSchema));
    await context.create(MOCK_HEROI_DEFAULT);
    const result = await context.create(MOCK_HEROI_ATUALIZAR);
    MOCK_HEROI_ID = result._id;
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

  it('listar', async () => {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome }, 0, 1);
    const result = { nome, poder };
    deepEqual(result, MOCK_HEROI_DEFAULT);
  });

  it('atualizar', async () => {
    const result = await context.update(MOCK_HEROI_ID, { nome: 'Pernalonga' });
    deepEqual(result.nModified, 1);
  });

  it('remover', async () => {
    const result = await context.delete(MOCK_HEROI_ID);
    deepEqual(result.n, 1);
  });
});
