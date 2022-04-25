const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define( 'articles', {

    title: {
        type: Sequelize.STRING, 
        allowNull: false 
    }, 

    slug: {
        type: Sequelize.STRING, 
        allowNull: false 
    }, 

    body: {
        type: Sequelize.TEXT, 
        allowNull: false
    }

})

// A utilidade dos relacionamentos é a "performace".
// hasMany - one to many
Category.hasMany( Article ) // Uma categoria tem muitos artigos 

// one to one
Article.belongsTo( Category ) // Um artigo pertence a uma categoria

//Cria a tabela
// Article.sync({ force: false })

module.exports = Article