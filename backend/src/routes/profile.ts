import express from 'express';
import UserProfile from '../models/userProfile.schema'; 

const router = express.Router();

// Create a new user profile
router.post('/', async (req, res) => {
  console.log('REQ.BODY:', req.body);
  try {
    const { name, email, location, budget, interests, itemsLookingFor } = req.body;
    const newProfile = new UserProfile({
      name,
      email,
      location,
      budget,
      interests,
      itemsLookingFor
    });

    const saved = await newProfile.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error('SAVE ERROR:', err);
    return res.status(400).json({ error: (err as Error).message });
  }
});

// Update an existing profile
router.put('/:id', async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    return res.json(updatedProfile); 
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message }); 
  }
});

export default router;

// Get User Favorites by UserID 
router.get('/:id', async (req, res) => {
  try {
    const profile = await UserProfile
      .findById(req.params.id)
      .populate('favorites')
      .exec();
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    return res.json(profile);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
});
