const router = require('express').Router();
const { Post, User, Comment, Dog } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Image.findAll({
        attributes: [
            'id',
            'image_name',
            'image_content',
            'data',
            'dog_id',
            'created_at'
        ],
      order: [['created_at', 'DESC']],
      include: [
        // Comment model here -- attached username to comment
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['id','username']
          }
        },
        {
          model: User,
          attributes: ['id','username']
        },
        {
            model: Dog,
            attributes: ['id', 'dog_name', 'dog_breed', 'user_id']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Image.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'image_name',
        'image_content',
        'data',
        'dog_id',
        'created_at'
      ],
      include: [
        // include the Comment model here:
        {
          model: User,
          attributes: ['id','username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['id','username']
          }
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
    Image.create({
      image_name: req.body.image_name,
      image_content: req.body.image_content,
      image_url: req.body.image_url,
      dog_id: req.session.dog_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', withAuth, (req, res) => {
    Image.update({
        image_name: req.body.image_name,
        image_content: req.body.image_content,
        image_url: req.body.image_url,
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Image.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;