const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    {id: 1, name: 'drama'},
    {id: 2, name: 'terror'},
    {id: 3, name: 'comedy'},
];


/* GET */
router.get('/', (req, res) => {
    res.send(genres);  
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id  === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('The requested genre was not found'); // 404
    }
    res.send(genre);
})


/* POST */
router.post('/', (req, res) => {
    // Input validation with Joi
    const { error } = validateGenre(req.body); // object de-structuring, result.error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if there are any genre entries, 
    // if so make id last one item +1
    let id = 1;
    if(genres.length > 0) id = genres[genres.length-1].id + 1;
    const genre = {
        id: id,
        name: req.body.name
    };
    genres.push(genre);
    // send newly created genre back for showing to user
    res.send(genre);
})


/* PUT */
router.put('/:id', (req, res) => {
    // Look up the genre
    // If not existing, return 404
    const genre = genres.find(g => g.id  === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('The genre with given id was not found'); // 404
    }

    // Validate 
    // If invalid, return 400 - Bad request
    const { error } = validateGenre(req.body); // object de-structuring, result.error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Update genre
    // Return the updated genre
    genre.name = req.body.name;
    res.send(genre);
})


/* DELETE */
router.delete('/:id', (req, res) => {
    // Look up the genre
    // Not exisitng, return 404
    const genre = genres.find(g => g.id  === parseInt(req.params.id));
    if (!genre) {
        return res.status(404).send('The requested genre was not found'); // 404
    }

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    // Return the same genre
    res.send(genre);
});


/* Validation function */
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema); // returns object after validation
};


module.exports = router;