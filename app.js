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

// morgan (middleware)
app.use(morgan('dev')); //dev, tiny

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