const Sequelize = require('sequelize')
const connection = require('../database/database')


const Category = connection.define('categories', {
   
    title: {
        type: Sequelize.STRING, 
        allowNull : false 
   
    }, slug : {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Cria a tabela semmpre que o app é executada
// Category.sync({ force: false })

module.exports = Category