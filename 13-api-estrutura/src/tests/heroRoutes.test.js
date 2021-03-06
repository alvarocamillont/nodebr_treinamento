const assert = require('assert');
const api = require('../api');

let app = {};
const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Bionica'
};
const MOCK_HEROI_INICIAL = {
  nome: 'Gavião negro',
  poder: 'A mira'
};
let MOCK_ID = '';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ilh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU4MzcyNTk5NX0.MxL5Geqn5WxToH-vEJLWQMMdGHKp2xicYKHco74jMGg';
const headers = {
  authorization: TOKEN
};

describe('Suite de testes da API Heroes', () => {
  before(async () => {
    app = await api;
    const result = await await app.inject({
      method: 'POST',
      url: `/herois`,
      headers,
      payload: MOCK_HEROI_INICIAL
    });
    const dados = JSON.parse(result.payload);
    MOCK_ID = dados._id;
  });

  it('listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois',
      headers
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it('lista/herois - deve retornar somente 3 registros', async () => {
    const TAMANHO_LIMITE = 3;
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
      headers
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === TAMANHO_LIMITE);
  });

  it('lista/herois - deve validar os parametros', async () => {
    const TAMANHO_LIMITE = 'AEEE';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
      headers
    });

    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 400);
  });

  it('lista GET - /herois - deve filtrar um item', async () => {
    const TAMANHO_LIMITE = 10000;
    const NAME = 'Flash';
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
      headers
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados[0].nome === NAME);
  });

  it('cadastrar POST - /herois', async () => {
    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      payload: MOCK_HEROI_CADASTRAR,
      headers
    });
    const { message, _id } = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, 'Heroi cadastrado com sucesso!');
  });

  it('atualizar PATCH - /herois/:id', async () => {
    const _id = MOCK_ID;
    const expected = {
      poder: 'Super FLECHA'
    };

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      payload: expected,
      headers
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!');
  });

  it('remover DELETE - /herois/:id', async () => {
    const _id = MOCK_ID;

    const result = await app.inject({
      method: 'DELETE',
      url: `/herois/${_id}`,
      headers
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, 'Heroi removido com sucesso!');
  });
});
