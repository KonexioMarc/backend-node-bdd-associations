// Model Association
// Model Message


// Créer des routes 
// [GET] /associations
// [GET] /associations/:id



// [POST] /message
// [GET] /message 

const express = require("express");
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/associations')

app.use(express.static('public'))
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

const associationSchema = new mongoose.Schema({
    slogan: String,
    description: String,
    image: String,
    name: String
})

const AssociationModel = mongoose.model('Association', associationSchema)

const messageSchema = new mongoose.Schema({
    name: String,
    message: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    associationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Association'
    }
})

const MessageModel = mongoose.model('Message', messageSchema)



app.get('/associations', async function(req, res, next) {
    // AssociationModel.find({}).exec().then(associations => {
    //     console.log('associations', associations)
    // })
    const associations = await AssociationModel.find({}).exec()
    res.json(associations)
})

app.get('/associations/:id', associationCheck, async function(req, res, next) {
    req.params // => { id: "aefjbaejf", toto: "dead", tata: "grsrg"}
    const id = req.params.id
    AssociationModel.findById(id).exec().then(asso => {
        res.json(asso)
    })
})

function associationCheck(req, res, next) {
    const id = req.body?.associationId || req.params?.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('The association is is not in the correct format')
    }
    AssociationModel.findById(id).exec().then(function(asso) {
        console.log('asso', asso)
        if (asso) {
            next()
        } else {
            res.status(404).send('The association doesnt exist')
        }
    })
}

app.post('/message', associationCheck , (req, res, next) => {
    const body = req.body
    console.log(body)
    const newMessage = new MessageModel(body)
    newMessage.save().then(message =>{
        res.json(message)
    }).catch(err => {
        res.status(500).send(err)
    })
})


app.listen(3005, function() {
    console.log("the server is started at", 3005)
})

// AssociationModel.insertMany([
//     {
//         slogan: "Faire du numérique une opportunité pour tous.tes",
//         description: "Konexio est une association et un organisme de formation qui forme aux compétences numériques - des plus basiques aux plus avancées - afin de faciliter l'inclusion socioprofessionnelle.",
//         image: "http://konexio.eu/uploads/1/2/0/2/120245745/konexio-logo_1.png",
//         name: "konexio" 
//     },
//     {
//         slogan: "On mange gratuit",
//         description: "S’engager aux côtés des Restos c’est permettre à l’association de continuer à bénéficier de soutien tout au long de l’année pour assurer ses missions sociales d’aide à la personne.",
//         image: "https://www.restosducoeur.org/wp-content/uploads/2016/04/logo.svg",
//         name: "Les restos du coeur" 
//     },
//     {
//         slogan: "Save all the children",
//         description: "UNICEF works in over 190 countries and territories to save children's lives, to defend their rights, and to help them fulfil their potential, from early childhood through adolescence. And we never give up. ",
//         image: "/unicef.png",
//         name: "Unicef" 
//     },
// ])

