const Sequelize = require('sequelize')
const connection = require('../database/database')


const User = connection.define('users', {
   
    email: {
        type: Sequelize.STRING, 
        allowNull : false 
   
    }, password : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Cria a tabela semmpre que o app é executada
// User.sync({ force: false })

module.exports = User