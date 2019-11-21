const Joi = require('joi');
const express = require('express');
const app = express();

// Request JSON Middleware
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];


/* GET */
app.get('/', (req, res) => {
    res.send('Hello !!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);  
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with given id was not found'); // 404
    }
    res.send(course);
})


/* POST */
app.post('/api/courses', (req, res) => {
    // Input validation checking the request
    /*if (!req.body.name || req.body.name.length <3) {
        // 400 bad request
        res.status(400).send('Name is required and should be minimum 3 chars');
        return;
    }*/

    // Input validation with Joi
    const { error } = validateCourse(req.body); // object de-structuring, result.error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    // send newly created course back for showing to user
    res.send(course);
})


/* PUT */
app.put('/api/courses/:id', (req, res) => {
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
app.delete('/api/courses/:id', (req, res) => {
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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))