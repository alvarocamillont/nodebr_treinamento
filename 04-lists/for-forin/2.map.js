const service = require('./service');
async function main(){
  try {
    const results = await service.obterPessoas('a')
  /*
    const name = []
    results.results.forEach(item => {
      name.push(item.name);
    });
  */
    const name = results.results.map((pessoas) => pessoas.name);
    console.log('names', name)
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();