const Sequelize = require( 'sequelize' )
const connection = new Sequelize('guidepress','apollo__nicolly', 'bash', {

    host: 'localhost', 
    dialect: 'mysql',
    timezone: '-03:00'

})


module.exports = connection