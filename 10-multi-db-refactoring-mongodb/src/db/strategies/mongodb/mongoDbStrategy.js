const IDb = require('../base/interfaceDb');
const Mongoose = require('mongoose');

const STATUS = {
  0: 'Desconectando',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectado'
};

class MongoDBStrategy extends IDb {
  constructor(connection,schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === 'Conectado') return state;
    if (state !== 'Conectando') return state;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return STATUS[this._connection.readyState];
  }

  static connect() {
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
    return connection
  }

  create(item) {
    return this._schema.create(item);
  }

  read(item, skip = 0, limit = 10) {
    return this._schema
      .find(item)
      .skip(skip)
      .limit(limit);
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDBStrategy;
