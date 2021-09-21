const router = require('express').Router();
const { isNull } = require('lodash');
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

router.post('/:id', (req, res) => {
    db.Dog.create(req.body).then(dbDog => {
        db.User.update({dogId: dbDog.id}, {
            where: {
              id: req.session.userID
            }
          }).then(dbUser => {
            res.json(dbUser);
          });
        
      });
  // update a category by its `id` value
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

router.delete('/:id', (req, res) => {
    db.Dog.destroy({where:{id:req.params.id}}).then(dbDog => {
        db.User.update({dogId: null}, {
            where: {
              id: req.session.userID
            }
          }).then(dbUser => {
            res.json(dbUser);
          });
        
      });
  });
  
  module.exports = router;
  