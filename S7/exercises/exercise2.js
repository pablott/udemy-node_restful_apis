const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost/mongo-exercises', 
    { useNewUrlParser: true, useUnifiedTopology: true }
    ) // this should come form a conf file
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB', err))
    ;

// Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
})
// Model 
const Course = mongoose.model('Course', courseSchema);


/* Querying courses */
async function getCourses() {
    return await Course
        //.find({ isPublished: true, tags: { $in: ['frontend', 'backend']} })
        // Or:
        .find({ isPublished: true })
        .or([ {tags: 'frontend'}, {tags: 'backend'} ])
        .sort( '-price' ) // price: -1
        .select( 'name author tags' ) // name: 1, author: 1
        ;
}

async function showCourses() {
    const courses = await getCourses();
    console.log(courses);
}

showCourses();