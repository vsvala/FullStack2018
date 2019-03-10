// const mongoose = require('mongoose')

// // korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
// const url = process.env.MONGODB_URI

// mongoose.connect(url)

// const Note = mongoose.model('Note', {
//   content: String,
//   date: Date,
//   important: Boolean
// })

// const note = new Note({
//   content: 'HTML on helppoa',
//   date: new Date(),
//   important: true
// })

// note
//   .save()
//   .then(response => {
//     console.log('note saved!')
//     mongoose.connection.close()
//   })