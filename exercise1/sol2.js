'use strict';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err) => {
        if (err)
            console.error(err);
        else
            console.log("Connected to the mongodb");
    });

const courseScheme = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseScheme);

async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([{ tags: 'frontend' }, {tags:'backend'}])
        .sort('-price')
        .select('name author price');
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
