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


app.get('/', ( req, res ) => { 
    questionModel.findAll({raw: true})
    .then((questions) =>  { 
        
        res.render('index', {
            questions: questions
            
        }) 
    })    
    
})




app.get('/question', ( req, res ) => { res.render('question')})

app.post('/savequestion', ( req, res ) => {

    const data = {
        title: req.body.title, 
        description: req.body.description
    }
    
    questionModel.create({
        title: data.title,
        description : data.description
        
    }).then(() => { res.redirect('/') 

    }).catch((err) => console.log(err))
    
})


app.listen(3000, () => console.log('Server is running at http://localhost:3000'))