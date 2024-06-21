const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const categories = require('./data/categories.json');

const news = require('./data/news.json');

const cors = require('cors');

app.use(cors())

app.get('/', (re, res) => {
    res.send('Spark is running')
});

app.get('/categories', (req, res) => {
    res.send(categories)
})

// Get all news
app.get('/news', (req, res) => {
    res.send(news);
})

// Get specific news using ID
app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    const selectedID = news.find(n => n._id === id);
    res.send(selectedID);
})

// Get News using category
app.get('/categories/:id', (req, res) => {
    const id = req.params.id;
    if (id === '0') {
        res.send(news)
    }
    else {
        const categoryNews = news.filter(n => n.category_id === id);
        res.send(categoryNews);
    }
})

app.listen(port, () => {
    console.log(`Spark API is running on port: ${port}`);
})