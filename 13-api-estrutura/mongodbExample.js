const Mongoose = require('mongoose');
Mongoose.connect(
  'mongodb://alvaro:senha123@localhost:27017/herois',
  { useNewUrlParser: true },
  error => {
    if (!error) return;
    console.log('Falha na conexão!', error);
  }
);

const connection = Mongoose.connection;

connection.once('open', () => console.log('Database rodando!!'));

//setTimeout(() => {
//  const state = connection.readyState;
//  console.log('state', state);
//}, 1000);
const heroisSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  poder: {
    type: String,
    required: true
  },
  insertedAt: {
    type: Date,
    default: new Date()
  }
});

const model = Mongoose.model('herois', heroisSchema);

async function main() {
  const resultCadastrar = await model.create({
    nome: 'Batman',
    poder: 'Dinheiro'
  });

  console.log('resultado cadastrar', resultCadastrar);

  const listItens = model.find();

  console.log('itens', listItens);
}

main();
