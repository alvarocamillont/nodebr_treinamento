const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');

const SENHA = 'Erick@32545545';
const HASH = '$2b$04$26QeBPFZYe/Uwpbkpd.Pse36n9zQIPHmlEIwkBHTHvJ4/sX2vU1Aq';

describe('UserHelper test suite', () => {
  it('deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    assert.ok(result.length > 10);
  });

  it('deve validar a nossa senha', async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH);
    assert.ok(result);
  });
});
