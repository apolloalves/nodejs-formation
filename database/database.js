const Sequelize = require( 'sequelize' )
const connection = new Sequelize('guidequiz','apollo__nicolly','bash',

{

    host: 'localhost', 
    dialect: 'mysql'

})


module.exports = connection