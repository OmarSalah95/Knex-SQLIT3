const zoosRouter = require('express').Router()
const db = require('../dbConfig.js');

// Get an Array of zoos from the db
zoosRouter.get('/', (req, res) => {
    db('zoos')
    .then(zoos => { res.status(200).json(zoos) })
    .catch(err => {res.status(500).json({message: `Couldn't retrieve zoo list. ${err}`})})
  })
// Add New Zoo to Db
  zoosRouter.post('/', (req, res) =>{
    req.body.name
        ? db('zoos').insert(req.body)
            .then(id =>{res.status(201).json(id)})
            .catch(err=>res.status(500).json({error: "Error inserting the submitted zoo."}))
        : res.status(400).json({message: "Please include a name for the submitted zoo."})
  })
// GET zoo by ID from DB
  zoosRouter.get('/:id', (req, res) => {
    db('zoos')
        .where({id: req.params.id})
            .then(zoo => {
                zoo   
                ? res.status(200).json(zoo)
                : res.status(404).json({message: "The zoo with the specified id does not exist."})
            })
            .catch(err => res.status(500).json({error: "An error occurred while retrieving this zoo."}))
  })
// Update and existing Zoo in the DB.
  zoosRouter.put('/:id', (req, res) => {
  req.body.name
    ?  db('zoos')
        .where({id: req.params.id})
        .update(req.body)
            .then(count => {
                count
                    ? res.status(200).json(count)
                    : res.status(404).json({message: "The zoo with that ID does not exits."})
            })
            .catch(err => res.status(500).json({error: "An error occurred while updating this zoo."}))
    : res.status(400).json({message: "Please include the updated zoo's name."})
  })


module.exports = zoosRouter