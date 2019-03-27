const bearsRouter = require('express').Router()
const db = require('../dbConfig.js');

// Get an Array of zoos from the db
bearsRouter.get('/', (req, res) => {
    db('bears')
    .then(bears => { res.status(200).json(bears) })
    .catch(err => {res.status(500).json({message: `Couldn't retrieve bear list. ${err}`})})
  })
// Add New bear to Db
  bearsRouter.post('/', (req, res) =>{
    req.body.name
        ? db('bears').insert(req.body)
            .then(id =>{res.status(201).json(id)})
            .catch(err=>res.status(500).json({error: "Error inserting the submitted bear."}))
        : res.status(400).json({message: "Please include a name for the submitted bear."})
  })
// GET bear by ID from DB
  bearsRouter.get('/:id', (req, res) => {
    db('bears')
        .where({id: req.params.id})
            .then(bear => {
                bear   
                ? res.status(200).json(bear)
                : res.status(404).json({message: "The bear with the specified id does not exist."})
            })
            .catch(err => res.status(500).json({error: "An error occurred while retrieving this bear."}))
  })
// Update and existing bear in the DB.
  bearsRouter.put('/:id', (req, res) => {
  req.body.name
    ?  db('bears')
        .where({id: req.params.id})
        .update(req.body)
            .then(count => {
                count
                    ? res.status(200).json(count)
                    : res.status(404).json({message: "The bear with that ID does not exits."})
            })
            .catch(err => res.status(500).json({error: "An error occurred while updating this bear."}))
    : res.status(400).json({message: "Please include the updated bear's name."})
  })
// Delete Existing bears in the DB
  bearsRouter.delete('/:id', (req, res) => {
    db('bears')
        .where({id: req.params.id})
        .del()
        .then(count => {
            count
                ? res.status(200).json({count})
                :res.status(404).json({message: "That bear doesn't exist in our Database"})
        })
        .catch(err=>res.status(500).json({error: "Could NOT delete this bear."}))
  })

module.exports = bearsRouter