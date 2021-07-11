const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes');
const url = require('./url');
// express app
const app = express();

// connect to mongodb
const dbURL = url;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000)) //console.log("connected!")
    .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');


// used morgan package instead
// app.use((req, res, next) => {
//     console.log('New request made:');
//     console.log('Host: ', req.hostname);
//     console.log('Path: ', req.path);
//     console.log('Method: ', req.method);
//     next();
// });

// morgan (middleware)
app.use(morgan('dev')); //dev, tiny

// mongoose and mongo sandbox routes
// the idea about getting the data from the db
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('60e631d2083c5e1f8059dceb')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });


// static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //middleware or .json() instead of urlencoded



// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRouter);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
