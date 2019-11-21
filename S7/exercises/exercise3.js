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
        .find({ isPublished: true })
        // This returns both courses with 'by' in name
        //.find({name: /.*by.*/})
        // But only returns the first one, not sure why
        .or([
            { price: {$gte: 15} },
            { name: /.*by.*/i }
        ])
        .sort('-price')
        .select( 'name author price' )
        ;
}

async function showCourses() {
    const courses = await getCourses();
    console.log(courses);
}

showCourses();