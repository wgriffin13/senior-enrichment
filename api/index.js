const router = require('express').Router();
const { Student, Campus } = require('../db')

router.get('/students', (req, res, next) => {
    Student.findAll()
        .then(data => res.send(data))
        .catch(next)
})

router.get('/campuses', (req, res, next) => {
    Campus.findAll()
        .then(data => res.send(data))
        .catch(next)
})

module.exports = router;
