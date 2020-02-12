const ICrud = require('./interfaces/interfaceCrud');
const Sequelize = require('sequelize');

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
    this._connect();
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.error('falied', error);
      return false;
    }
  }

  _connect() {
    this._driver = new Sequelize(
      'heroes', //database
      'alvaro', // user
      'senha123', //senha
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false
        },
    );

    this.defineModel();
  }

  async defineModel() {
    this._herois = this._driver.define(
      'heroes',
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        //opcoes para base existente
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false,
      },
    );

    await this._herois.sync();
  }

  create(item) {
    console.log('O item foi salvo no Postgres');
  }
}

module.exports = Postgres;
