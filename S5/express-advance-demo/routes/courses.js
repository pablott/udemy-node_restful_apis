const Joi = require('joi');
const express = require('express');
const router = express.Router(); // express instance, named router instead of app

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];


/* GET */
router.get('/', (req, res) => {
    res.send(courses);  
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with given id was not found'); // 404
    }
    res.send(course);
})


/* POST */
router.post('/', (req, res) => {
    // Input validation with Joi
    const { error } = validateCourse(req.body); // object de-structuring, result.error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if there are any course entries, 
    // if so make id last one item +1
    let id = 1;
    if(courses.length > 0) id = courses[courses.length-1].id + 1;
    const course = {
        id: id,
        name: req.body.name
    };

    courses.push(course);
    // send newly created course back for showing to user
    res.send(course);
})


/* PUT */
router.put('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with given id was not found'); // 404
    }

    // Validate 
    // If invalid, return 400 - Bad request
    //const result = validateCourse(req.body); // without object de-structure
    const { error } = validateCourse(req.body); // object de-structuring, result.error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Update course
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
})


/* DELETE */
router.delete('/:id', (req, res) => {
    // Look up th course
    // Not exisitng, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with given id was not found'); // 404
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});


/* Validation function */
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema); // returns object after validation

};


module.exports = router;