const IDb = require('./base/interfaceDb');
const Mongoose = require('mongoose');

const STATUS = {
  0: 'Desconectando',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectado'
};

class MongoDBStrategy extends IDb {
  constructor() {
    super();
    this._herois = null;
    this._driver == null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === 'Conectado') return state;
    if (state !== 'Conectando') return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return STATUS[this._driver.readyState];
  }

  defineModel() {
    const schema = new Mongoose.Schema({
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

    this._herois = Mongoose.model('herois', schema);
  }

  connect() {
    Mongoose.connect(
      'mongodb://alvaro:senha123@localhost:27017/herois',
      { useNewUrlParser: true },
      error => {
        if (!error) return;
        console.log('Falha na conexão!', error);
      }
    );

    this._driver = Mongoose.connection;
    this._driver.once('open', () => console.log('Database rodando!!'));
  }

  async create(item) {
    const resultCadastrar = await model.create(item);

    return resultCadastrar;
  }
}

module.exports = MongoDBStrategy;
