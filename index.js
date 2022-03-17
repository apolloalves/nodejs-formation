const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const QuestionModel = require('./database/Question')

const connection = require('./database/database')
const Answer = require('./database/Answer')


app.use( bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.json() )

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));


//Promisse connection
connection
    .authenticate()
    .then(() => {
        console.log('Connection on database')
    })
    .catch((err) => console.log( err ))


// Routes
app.get('/', ( req, res ) => { 
    QuestionModel.findAll({
        raw: true, order: 
        [['id','DESC']
    ]})

    .then((questions) =>  { 
        console.log(questions)
        
        res.render('index', {
            questions: questions
            
        }) 
    })    
    
})


app.get('/question', ( req, res ) => { res.render('question')})




app.get('/question/:id', (req, res ) => {
    const id = req.params.id
    // search dabatabase
    QuestionModel.findOne({
        
        where: { id: id }
    }).then((question) => {

        question != undefined
       
        ? res.render('answer', {
            question: question
        }) 
        : res.redirect('/')
    })

    .catch(erro => console.log(err))

})

app.post('/savequestion', ( req, res ) => {

    const data = {
        title: req.body.title, 
        description: req.body.description, 
    }
    
    QuestionModel.create({
        title: data.title,
        description : data.description
        
    }).then(() => { res.redirect('/') 

    }).catch((err) => console.log(err))
    
})


app.post('/responder', ( req, res ) => {
    

        const corpo = req.body.corpo 
        const perguntaId =  req.body.pergunta
        
   
    
    Answer.create({
        
        corpo: corpo,
        perguntaId: perguntaId
        
        
    }).then(() => {
        console.log('Dados do req' + corpo)
        res.redirect( '/question/' + perguntaId )

    }).catch(err => console.log('ocorreu um erro: '  +  err  ))


    
})




app.listen(3000, () => console.log('Server is running at http://localhost:3000'))