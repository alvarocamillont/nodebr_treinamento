const { obterPessoas } = require('./service');

async function main() {
  try {
    const { results } = await obterPessoas('a');
    const familiars = results.filter(pessoas => pessoas.name.toLowerCase().indexOf('lars') !== -1);
    const names = familiars.map(pessoas => pessoas.name);
    console.log('familiars', names);
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();
