const assert = require('assert');
const api = require('../api');

let app = {};
describe('Suite de testes da API Heroes',()=>{
  before(async ()=>{
    app = await api;
  })

  it('listar /herois', async ()=>{
    const result = await app.inject({
      method:'GET',
      url: '/herois'
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  })

  it('lista/herois - deve retornar somente 3 registros', async ()=>{
    const TAMANHO_LIMITE = 3
    const result = await app.inject({
      method:'GET',
      url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode,200);
    assert.ok(dados.length === TAMANHO_LIMITE )
  })

  it('lista/herois - deve retornar somente 3 registros', async ()=>{
    const TAMANHO_LIMITE = "AEEE"
    const result = await app.inject({
      method:'GET',
      url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })


    assert.deepEqual(result.payload,'Erro interno no servidor');
  })

  it('lista/herois - deve filtrar um item', async ()=>{
    const TAMANHO_LIMITE = 10000
    const NAME = 'Flash'
    const result = await app.inject({
      method:'GET',
      url:`/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
    })

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode,200);
    assert.ok(dados[0].nome === NAME);
  })
})