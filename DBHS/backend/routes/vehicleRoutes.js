import express from 'express';
import { getVehicles, registerVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/', getVehicles);
router.post('/', registerVehicle);
router.put('/:id', updateVehicle); 
router.delete('/:id', deleteVehicle);

export default router;
