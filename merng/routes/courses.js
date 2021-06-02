const express = require('express');
const router = express.Router();

const courses = [

    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    //Validate
    //If invalid, return 400 - bad request
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    //Look ip the course
    // If not existing , return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');

    const { error, value } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //Update course
    //Return the updated course
    course.name = req.body.name;
    res.send(course);
});


router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
});

router.delete('/:id', (req, res) => {
    //Look ip the course
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);


    //Return the same course

});


function validateCourse(course) {
    const schemaRule = {
        name: Joi.string().min(3).required()
    };

    const schema = Joi.object(schemaRule);

    const options = {
        aboutEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };

    return schema.validate(course, options);
}

module.exports = router;