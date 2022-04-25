const bodyparser = require( 'body-parser' )
const session = require('express-session')
const connection = require('./database/database')
const express = require( 'express' )
const app = express()
const CategoriesController = require('./categories/CategoriesController')
const ArticleController = require('./articles/ArticlesController')

const userController = require('./users/UserController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')
const User = require('./users/User')
const { redirect } = require('express/lib/response')

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))

// Redis -BD focado em salvamento de sessões e cache


//Sessions
app.use(session({
    secret: "qualquercoisa", cookie: {maxAge: 30000}
}))




app.use(bodyparser.urlencoded({ extended : false }))
app.use(bodyparser.json())

app.get('/', ( req, res ) => {

    Article.findAll({
        order: [
            ['id', 'DESC']
        ], 

        limit: 4

    }).then(articles => {
        Category.findAll().then(categories => {
            res.render( 'index', {articles: articles, categories: categories} )

        })
    })
    
    
})


app.get('/:slug', (req, res) => {
    const slug = req.params.slug
    
    Article.findOne({

        where: {
            slug: slug
        }

    }).then((article) => {

        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render( 'article', {article: article, categories: categories} )
            
        })

        }else {
            res.redirect('/')
        }
    }).catch(err => redirect('/'))
})

app.get('/category/:slug', (req, res) => {

    const slug = req.params.slug

    Category.findOne({
        where: {
            slug: slug
        }, 

        include: [{model: Article}]

    }).then(category => {
        if(category != undefined) {

            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories})
            }) 

        }else{
            res.redirect('/')
        }
    }).catch(err => res.redirect('/'))
})


connection
    
    .authenticate()
    .then(() => console.log( 'Database access "guidepress" is done!'))
    .catch(err => console.log( `Something went wrong : ${err}` ))


app.use('/', CategoriesController)
app.use('/', ArticleController)
app.use('/', userController)



app.listen(8080, () => console.log('server is running at http://localhost:8080'))

