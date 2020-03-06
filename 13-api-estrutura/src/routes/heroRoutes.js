const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute{
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path:'/herois',
      method:'GET',
      handler:(request, head)=>{
        try {
          const {skip,limit,nome} = request.query
          const query = nome ? {nome}: {}
          if (skip && isNaN(skip)) throw Error('Skip deve ser um número')
          if (limit && isNaN(limit)) throw Error('Limit deve ser um número')

          return this.db.read(query,parseInt(skip),parseInt(limit));
        } catch (error) {
          console.log('Deu Ruim', error)
          return 'Erro interno no servidor'
        }
      }
    }
  }
}

module.exports = HeroRoutes;