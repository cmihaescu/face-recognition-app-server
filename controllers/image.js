const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'adf16535530c4681ab51685fd1458cb7'
   });

const handleApiCall = (req, res) => {
app.models.predict(
    Clarifai.CELEBRITY_MODEL,
    req.body.input)
    .then(data => {res.json(data)})
    .catch(err => res.status(400).json('unable to work with API'));
}


const handleImage = (req, res, db) => {
    const {id} = req.body
    let found = false
    
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {handleImage, handleApiCall}