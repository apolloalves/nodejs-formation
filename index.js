const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const questionModel = require('./database/Question')

const connection = require('./database/database')

//Promisse connection
connection
    .authenticate()
    .then(() => {
        console.log('Connection on database')
    })
    .catch((err) => console.log( err ))


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/', ( req, res ) => { res.render('index') })
app.get('/question', ( req, res ) => { res.render('question')})

app.post('/savequestion', ( req, res ) => {

    const data = {
        title: req.body.title, 
        description: req.body.description
    }
    

    res.send(`Data received : ${data.title} -> ${data.description}`)
})


app.listen(3000, () => console.log('Server is running at http://localhost:3000'))