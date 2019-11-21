const express = require('express');
const router = express.Router(); // express instance, named router instead of app

/* GET */
router.get('/', (req, res) => {
    res.render('index', {title: 'My Express app', message: 'Hello'});
});

module.exports = router;
