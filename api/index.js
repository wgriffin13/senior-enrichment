const router = require('express').Router();
const { Student, Campus } = require('../db')

router.post('/students', (req, res, next) => {
    Student.create(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(next)
})

router.post('/campuses', (req, res, next) => {
    Campus.create(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(next)
})

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
