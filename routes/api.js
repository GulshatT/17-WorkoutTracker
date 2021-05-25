const router = require("express").Router();
const db = require("../models");

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: {exercises: req.body}},
    { new: true})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      console.log(dbWorkout);
      const workout = dbWorkout.map(workout =>{
        console.log({workout});
        const duration = workout.exercises.reduce((acc, next)=>{
          return acc + next.duration;
        }, 0);
        
        return {
          totalDuration: duration,
          ...workout.toObject()
        }
      })
      res.json(workout);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});
router.get("/api/workouts/range", (req, res) => {
  console.log('range***')
  db.Workout.find({})
    .then(dbWorkout => {
      console.log(dbWorkout)
      res.json(dbWorkout); })
    
    .catch(err => { res.json(err); });
});

module.exports = router;
