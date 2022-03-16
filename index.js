const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const questionModel = require('./database/Question')

const connection = require('./database/database')

app.use( bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.json() )

app.set('view engine', 'ejs')
app.use(express.static('public'))


//Promisse connection
connection
    .authenticate()
    .then(() => {
        console.log('Connection on database')
    })
    .catch((err) => console.log( err ))


// Routes
app.get('/', ( req, res ) => { 
    questionModel.findAll({
        raw: true, order: 
        [['id','DESC']
    ]})

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


app.get('/question/:id', (req, res ) => {
    const id = req.params.id
    // search dabatabase
    questionModel.findOne({
        
        where: { id: id }
    }).then((question) => {

        question != undefined
       
        ? res.render('questionsSearch', {
            question: question
        }) 
        : res.redirect('/')
    })

    .catch(erro => console.log(err))

})


app.listen(3000, () => console.log('Server is running at http://localhost:3000'))