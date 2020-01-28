const service = require('./service');

async function main() {
  try {
    const result = await service.obterPessoas('a');
    let names = [];
    console.time('for')
    for (let index = 0; index < result.results.length - 1; index++) {
      const pessoa = result.results[index];
      names.push(pessoa.name);
    }
    console.timeEnd('for')

    names = [];
    console.time('forin')
    for (let i in result.results) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd('forin')

    names = [];
    console.time('forof')
    for (const pessoa of result.results) {
      names.push(pessoa.name);
    }
    console.timeEnd('forof')

    console.log('names',names);
  } catch (error) {
    console.error('erro interno', error);
  }
}

main()