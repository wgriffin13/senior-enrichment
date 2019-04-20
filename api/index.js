const router = require('express').Router();
const { Student, Campus } = require('../db')

router.get('/campuses/:id', (req, res, next) => {
    Campus.findOne({
        where: {
            id: req.params.id
        },
        include: [Student]
    })
        .then(data => res.send(data))
        .catch(next)
})

router.get('/students/:id', (req, res, next) => {
    Student.findOne({
        where: {
            id: req.params.id
        },
        include: [Campus]
    })
        .then(data => res.send(data))
        .catch(next)
})

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
