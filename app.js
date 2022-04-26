
//optional params
const sum = ( a, b = 80 ) => { console.log(a + b) }

const cognizant = {
    id: 831096, 
    name:  'Douglas Apolonio Alves', 
    project: 'MSD'
} 

//Spred Operator
const user = { ...cognizant }
console.log( user )

// Destructure
let { name, id } = cognizant
console.log( name + '\n' + 'id:' + id )

let victor = {
    nome: 'Victor Lima', 
    empresa: 'Guia do Programador', 
    salario: 1000
}

let david = {
    nome: 'David', 
    empresa: 'Ummbler',
    salario: 800
}

let erik = {
    nome: 'Erik Fig', 
    empresa: 'Udemy',
    salario: 500
}

const users = [victor, david, erik]

//Find - Método que serve para buscar dados
let vitao = users.find( user =>  user.nome === 'Victor Lima') // verificar()
let davi = users.find( user => user.salario < 1000 && user.salario > 500)

console.log(vitao)
console.log(davi)


// obj encurtado
let nome = 'Douglas'
let sobrenome = 'Apolonio'
let idade = 39

// result
const person = {
    nome, 
    sobrenome,
    idade
}

console.log(person)





