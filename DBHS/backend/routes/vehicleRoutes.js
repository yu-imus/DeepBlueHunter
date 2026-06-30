import express from 'express';
import {
  getVehicles,
  registerVehicle,
  deleteVehicle,
  updateVehicle,
  getVehicleById,
  getVehicleEntries,
  createVehicleEntry,
  deleteVehicleEntry,
  updateVehicleEntry
} from '../controllers/vehicleController.js';
import { protect, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// vehicle CRUD
router.get('/', getVehicles);
router.post('/', protect, requireAdmin, registerVehicle);
router.get('/:id', getVehicleById);
router.put('/:id', protect, requireAdmin, updateVehicle);
router.delete('/:id', protect, requireAdmin, deleteVehicle);

// entries nested under vehicle
router.get('/:id/entries', protect, getVehicleEntries);
router.post('/:id/entries', protect, createVehicleEntry);
router.delete('/:id/entries/:entryId', protect, requireAdmin, deleteVehicleEntry);
router.put('/:id/entries/:entryId', protect, requireAdmin, updateVehicleEntry);

export default router;
