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
   
    let id = req.params.id

    // search dabatabase
    QuestionModel.findOne({
        
        where: { id: id }
    }).then((question) => {

        if(question != undefined) {

            Answer.findAll({
                where: {questionId: question.id}, 
                    order: [ ['id','DESC' ] ]

            }).then(answers => {
                res.render('answer', {
                    question: question, 
                    answers: answers
                })
            })

        }else{
            res.redirect('/')
        }
       
})
})


app.post('/savequestion', ( req, res ) => {

    let data = {
        title: req.body.title, 
        description: req.body.description, 
    }
    
    QuestionModel.create({
        title: data.title,
        description : data.description
        
    }).then(() => { res.redirect('/') 

    }).catch((err) => console.log(err))
    
})


app.post('/reply', ( req, res ) => {
    
        let data_answer = {

            answer: req.body.answer, 
            questionId:  req.body.question
        }

    Answer.create({
        
        answer: data_answer.answer,
        questionId: data_answer.questionId
        
        
    }).then(() => {
        
        // console.log('Dados do req' + data_answer.answer)
        res.redirect( '/question/' + data_answer.questionId )

    }).catch(err => console.log('ocorreu um erro: '  +  err  ))


    
})


app.listen(3000, () => console.log('Server is running at http://localhost:3000'))