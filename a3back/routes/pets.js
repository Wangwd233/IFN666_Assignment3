const express = require('express');
const router = express.Router();

//function to check if variable is int
const isValidInteger = (value) => {
    return Number.isInteger(Number(value));
};

//function to check if variable is double
const isValidDouble = (value) => {
    return !isNaN(value) && Number(value) === parseFloat(value);
  }

// Route to retrieve all pets
// Route to retrieve all pets, with optional filtering by owner
router.get('/', async (req, res) => {
    const { owner } = req.query;
    try {
      const query = req.db('pets').select('*');
      if (owner) {
        query.where({ owner });
      }
      const pets = await query;
      res.json(pets);
    } catch (error) {
      console.error('Error retrieving pets:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Route to retrieve a pet by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const pet = await req.db('pets').where({ id }).first();
  
      if (pet) {
        res.json(pet);
      } else {
        res.status(404).json({ error: 'Pet not found' });
      }
    } catch (error) {
      console.error('Error retrieving pet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Route to add a new pet
router.post('/', async (req, res) => {
    const { petname, category, owner, age, weight } = req.body;
  
    if (!petname || !owner) {
      return res.status(400).json({ error: 'Petname and owner are required' });
    }
  
    if (age !== undefined && !isValidInteger(age)) {
      return res.status(400).json({ error: 'Age must be an integer' });
    }
  
    if (weight !== undefined && !isValidDouble(weight)) {
      return res.status(400).json({ error: 'Weight must be a double' });
    }
  
    try {
      await req.db('pets').insert({
        petname,
        category,
        owner,
        age: age !== undefined ? Number(age) : null,
        weight: weight !== undefined ? Number(weight) : null
      });
      res.status(201).json({ message: 'Pet added successfully' });
    } catch (error) {
      console.error('Error adding pet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to update a pet
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { petname, category, owner, age, weight, needfeeding } = req.body;
  
    if (age !== undefined && !isValidInteger(age)) {
      return res.status(400).json({ error: 'Age must be an integer' });
    }
  
    if (weight !== undefined && !isValidDouble(weight)) {
      return res.status(400).json({ error: 'Weight must be a double' });
    }
  
    try {
      const updated = await req.db('pets')
        .where({ id })
        .update({
          petname,
          category,
          owner,
          age: age !== undefined ? Number(age) : null,
          weight: weight !== undefined ? Number(weight) : null,
          needfeeding: needfeeding ? new Date(needfeeding) : null,
        });
  
      if (updated) {
        res.json({ message: 'Pet updated successfully' });
      } else {
        res.status(404).json({ error: 'Pet not found' });
      }
    } catch (error) {
      console.error('Error updating pet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
  // Route to delete a pet
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await req.db('pets')
        .where({ id })
        .del();
  
      if (deleted) {
        res.json({ message: 'Pet deleted successfully' });
      } else {
        res.status(404).json({ error: 'Pet not found' });
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;