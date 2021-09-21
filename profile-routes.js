const router = require('express').Router();
const sequelize = require('../config/connection');
const { Dog, Image , User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    User.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'username',
        'created_at',
      ],
      include: [
        {
          model: Dog,
          attributes: ['id', 'dog_name', 'dog_breed', 'user_id', 'created_at'],
          include: {
            model: Image,
            attributes: [    
            'id',
            'image_name',
            'image_content',
            'data',
            'dog_id',
            'created_at'
            ]
          }
        },
        {
          model: Image,
          attributes: [
            'id',
            'image_name',
            'image_content',
            'data',
            'dog_id',
            'created_at'
          ]
        }
      ]
    })
      .then(dbUserData => {
        // serialize data before passing to template
        const users = dbUserData.map(User => User.get({ plain: true }));
        res.render('profile', { users, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Dog.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'dog_name',
        'dog_breed',
        'user_id',
      ],
      include: [
        {
          model: Image,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['id', 'username', 'password']
          }
        },
        {
          model: User,
          attributes: ['id', 'username', 'password']
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbUserData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: true
            });
      })
      // need to change this if we add new model
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/create/', withAuth, (req, res) => {
    Image.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'image_name',
        'image_content',
        'data'
      ],
      include: [
        {
          model: Dog,
          attributes: ['id', 'dog_name', 'dog_breed', 'user_id'],
          include: {
            model: User,
            attributes: ['id', 'username',]
          }
        },
        {
          model: User,
          attributes: ['id', 'username',]
        }
      ]
    })
      .then(dbUserData => {
        // serialize data before passing to template
        const posts = dbUserData.map(post => post.get({ plain: true }));
        res.render('create-post', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;