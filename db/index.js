const Sequelize = require('sequelize');
const faker = require('faker')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/senior-enrichmentDB', {
    logging: false
})

const seed = {
    campuses: [
        {name: faker.company.companyName(), imageUrl: faker.image.image(), address: faker.address.streetAddress(), description: faker.lorem.text()},
        {name: faker.company.companyName(), imageUrl: faker.image.image(), address: faker.address.streetAddress(), description: faker.lorem.text()},
        {name: faker.company.companyName(), imageUrl: faker.image.image(), address: faker.address.streetAddress(), description: faker.lorem.text()}
    ],
    students: [
        {firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.avatar(), gpa: faker.random.number({min: 0, max: 4, precision: 0.01})},
        {firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.avatar(), gpa: faker.random.number({min: 0, max: 4, precision: 0.01})},
        {firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.avatar(), gpa: faker.random.number({min: 0, max: 4, precision: 0.01})}
    ]
}

const Campus = conn.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'http://placehold.jp/150x150.png',
        validate: {
            isUrl: true,
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    description: {
        type: Sequelize.TEXT
    }
});

const Student = conn.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: false,
            isEmail: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'http://placehold.jp/150x150.png',
        validate: {
            isUrl: true
        }
    },
    gpa: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
});

Student.belongsTo(Campus);
Campus.hasMany(Student);

const syncAndSeed = () => {
    return conn.sync({ force: true })
        .then(() => {
            return Promise.all([
                Promise.all(
                    seed.campuses.map(campus => Campus.create(campus))
                )
                .then(campusEnteries => {
                    Promise.all(
                        seed.students.map((student, count) => {
                            Student.create({...student, campusId: campusEnteries[count].id})
                        })
                    )
                })
            ])
        })
}

module.exports = {
    syncAndSeed,
    Campus,
    Student
}
