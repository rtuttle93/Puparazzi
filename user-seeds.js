const { User } = require('../models');

const userData = [
    {
        username: "martin_bour",
        password: "p@ssword1"
    },
    {
        username: "matt_b",
        password: "p@ssword2"
    },
    {
        username: "shaun_c",
        password: "p@ssword3"
    },
    {
        username: "lee_n",
        password: "p@ssword4"
    },
    {
        username: "priya_r",
        password: "p@ssword5"
    },
    {
        username: "pooja",
        password: "p@ssword6"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;