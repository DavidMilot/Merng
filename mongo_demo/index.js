const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err) => {
        if (err)
            console.error(err);
        else
            console.log("Connected to the mongodb");
    });

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },
    author: String,
    //Custom validator for tags:
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    //Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 1000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, defaukt: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Teds course',
        category: 'web',
        author: 'Ted',
        tags: ['test', 'testme'],
        isPublished: true,
        price: 15
    });

    try {
        const result = await course.save();
        console.log('result');
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field]);
        }
    }
    
}

async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greather than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    // or 
    // and

    const courses = await courses
        //.find({ author: 'Test me here', isPublished: true })
        //.find({ price: {$gte:10, $lte: 20} })
        //.find({ price: { $in: [10,15,20]} })
        //.find()
        //.or([{ author: 'Ted' }, { isPublished: true }])
        //.and([])
        //Starts with Ted
        //.find({ author: /^Ted/ })

        //Ends with Talk
        //.find({ author: /Talk$/ })

        //Contains Ted
        //.find({ author: /.*Ted.*/ })

        //Contains Ted using case insensitive
        //.find({ author: /.*Ted.*/i })

        .find({ author: 'Test me here', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        //.select({name:1, tags: 1});
        .count();
    console.log(courses);
}

async function updateCourse(id) {
    //Approach : Query first
    //findById()
    //Modify its properties
    //save()

    /*
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another author';

    const result = await course.save();
    console.log(result);
    */

    //Apprach: update first
    //Update directly
    //Optionally: get the updated document

    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Author name here',
            isPublished: false
        }
    });
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id })
    console.log(result);
}

removeCourse('60b445ac185b651da4d8c95f');
