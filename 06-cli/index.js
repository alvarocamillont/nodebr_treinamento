const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
  Commander.version('v1')
    .option('-n,--nome [value]', 'Nome do Heroi')
    .option('-p, --poder [value]', 'Poder do Heroi')
    .option('-i, --id [value]', 'Id herois')
    .option('-c, --cadastrar', 'Cadastrar um heroi')
    .option('-l, --listar', 'Listar herois')
    .option('-r, --remover', 'Remover heroi por id')
    .option('-a, --atualizar [value]', 'Atualizar heroi por id')
    .parse(process.argv);
  const heroi = new Heroi(Commander);
  try {
    if (Commander.cadastrar) {
      delete heroi.id;
      const resultado = await Database.cadastrar(heroi);
      if (!resultado) {
        console.error('Heroi não foi cadastrado');
        return;
      }
      console.log('Heroi cadastrado com sucesso');
    }
    if (Commander.listar) {
      const resultado = await Database.listar();
      console.log(resultado);
    }
    if (Commander.remover) {
      const resultado = await Database.remover(heroi.id);
      if (!resultado) {
        console.error('Heroi não foi removide');
        return;
      }
      console.log('Heroi excluido com sucesso');
    }

    if (Commander.atualizar) {
      const idParaAtualizar = parseInt(Commander.atualizar);
      delete heroi.id;
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await Database.atualizar(
        idParaAtualizar,
        heroiAtualizar
      );
      if (!resultado) {
        console.error('Heroi não foi atualizado');
        return;
      }
      console.log('Heroi atualizado com sucesso');
    }
  } catch (error) {
    console.error('Deu ruim', error);
  }
}

main();
