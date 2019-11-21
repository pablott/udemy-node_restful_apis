const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true }) // this should come form a conf file
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB', err))
    ;

// Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

// Model 
const Course = mongoose.model('Courses', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    // Save a document
    // (async operation)
    const result = await course.save();
    //console.log(result);
}

//createCourse();


/* Querying courses */
async function getCourses() {


    // Comparison operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

    // Logical operators
    // or
    // and

    // Reg expressions
    // see examples below

    // Pagination
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10
    
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true})
        // Comparison operators
        //.find({ price: { $gte: 10, $lte: 20 } }) // price =<10 & =>20
        //.find({ price: { $in: [10, 15, 20] } }) // exactly 10 OR 15 OR 20
        
        // Logical operators
        //.or([ { author: 'Mosh'}, { isPublished: true } ])
        //.and([ { author: 'Mosh'}, { isPublished: true } ])

        // GREP
        //.find({ author: /^Mosh/}) // Starts with Mosh
        //.find({ author: /Hamedani$/}) // Ends with Hamedani
        //.find({ author: /.*Mosh.*$/}) // ContainsMosh

        // Count
        //.count() // count documents that match .find filter

        // Pagination
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 }) //-1 fro reversing order
        .select({ name: 1, tags: 1 })
        ;
    console.log(courses);
}


createCourse();
getCourses();