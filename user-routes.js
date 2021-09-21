const router = require('express').Router();
const db = require('../../models');

// Routes
// =============================================================

router.get('/', (req, res) => {
  db.User.findAll({
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just `db.Post`
    include: [db.Dog]
  }).then(dbUser => {
    res.json(dbUser);
  });
});

router.get('/:id', (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id
    },
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just `db.Post`
    include: [db.Dog]
  }).then(dbUser => {
    res.json(dbUser);
  });
});

// Login route
// Logout route

router.post('/', (req, res) => {
  db.User.create(req.body).then(dbUser => {
    //   May want to create a login token to sign in the User automatically after sign up.
    res.json(dbUser);
    
  });
});

router.put('/:id', (req, res) => {
    db.User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbUser => {
      res.json(dbUser);
    });

  // update a User by its `id` value
});
// route for adding a new dog to the user
// router.put('/:id', (req, res) => {
//     db.Dog.create(req.body).then(dbDog => {
//         db.User.update({dogId: dbDog.id}, {
//             where: {
//               id: req.session.userID
//             }
//           }).then(dbUser => {
//             res.json(dbUser);
//           });
        
//       });
//   // update a User by its `id` value
// });

router.delete('/:id', (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbUser => {
    res.json(dbUser);
  });
});

module.exports = router;
