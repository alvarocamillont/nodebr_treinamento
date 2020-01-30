const { obterPessoas } = require('./service');

async function main() {
  try {
    const { results } = await obterPessoas('a');
    const pesos = results.map(item => parseInt(item.height));
    const total = pesos.reduce((anterior, proximo) => {
      return anterior + proximo;
    }, 0);
    console.log(total);

    const minhaLista = [
      ['Alvaro', 'Camillo'],
      ['AngularSP', 'Totvs Developers']
    ];

    const comunidades = minhaLista
      .reduce((anterior, proximo) => {
        return anterior.concat(proximo);
      }, [])
      .join(', ');

    console.log(comunidades);
  } catch (error) {
    console.error('DEU RUIM', error);
  }
}

main();
