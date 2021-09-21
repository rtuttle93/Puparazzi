const { User } = require('../models');

const userData = [
    {
        dog_name: "Tilly",
        dog_breed: "American Bulldog",
        user_id: 0,
    },
    {
        dog_name: "Arthur",
        dog_breed: "West Highland Terrier",
        user_id: 2,
    },
    {
        dog_name: "Barker",
        dog_breed: "Poodle",
        user_id: 3,
    },
    {
        dog_name: "Spot",
        dog_breed: "Rottweiler",
        user_id: 4,
    },
    {
        dog_name: "Binky",
        dog_breed: "Great Dane",
        user_id: 5,
    },
    {
        dog_name: "Hank",
        dog_breed: "American Bull Terrier",
        user_id: 6,
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;