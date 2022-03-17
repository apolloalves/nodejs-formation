const Sequelize = require('sequelize')
const connection = require('./database')

const Answer = connection.define("answers", {

    corpo: {
        type: Sequelize.TEXT, 
        allowNull: false

    }, 

    perguntaId : {
        type: Sequelize.INTEGER,
        allowNull: false

    }

})

Answer.sync({force: false})


module.exports = Answer

