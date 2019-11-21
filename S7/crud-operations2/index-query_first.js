const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo db connected"))
  .catch(error => console.log('error : ', error))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function updateCourses(id) {
  const course = await Course.findById(id);
  if (!course) return;
  console.log(course);

  course.isPublished = true;
  course.author = 'Another Author';

  const result = await course.save();
  console.log(result);
}

updateCourses('5a68fdf95db93f6477053ddd');
