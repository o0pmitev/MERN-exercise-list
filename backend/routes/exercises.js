const router = require('express').Router();
let User = require('../models/exercise.model');
const Exercise = require('../models/exercise.model');

// @route   GET /exercise
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error' + err));
})

// @route   POST /exercises/add
// @desc    Create exercise
// @access  Public
router.post('/add', (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = Date.parse(req.body.date);

  const newExercise =  new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error' + err));
});


// @route   GET /exercises/:id
// @desc    get exercise
// @access  Public

router.get('/:id', (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error' + err))
});


// @route   DELETE /exercises/:id
// @desc    delete an exercise
// @access  Public

router.delete('/:id', (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// @route   POST /exercises/update/:id
// @desc    edit an exercise
// @access  Public

router.post('/update/:id', (req, res) => {
  Exercise.findById(req.params.id)
  .then(exercise => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = req.body.duration;
    exercise.date = Date.parse(req.body.date);

    exercise.save()
      .then(() => res.json('Exercise updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;