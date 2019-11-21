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
  const result = await Course.update({_id: id}, {
    $set: {
      author: 'Mosh',
      isPublished: false
    }
  });

  console.log(result);
}

updateCourses('5a68fdf95db93f6477053ddd');
