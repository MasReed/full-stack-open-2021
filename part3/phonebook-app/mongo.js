const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://FSO-admin-mason:${password}@cluster0.075fr.mongodb.net/FSO?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})


const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)




if (process.argv.length > 3) {

    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })

    contact.save().then( result => {
        console.log('Contact saved!')
        mongoose.connection.close()
    })
} else {
    Contact.find({}).then( result => {
        result.forEach( contact => {
            console.log(contact)
        })
        mongoose.connection.close()
    })
}
