// EntryModal.js
import React, { useState } from 'react';
import api from '../api/axios';
import '../components/modal.css';

export default function EntryModal({ vehicleId, month, onClose, onSubmit }) {
  const [form, setForm] = useState({
    type: 'trip', // 'trip' or 'maintenance'
    details: '',
    tripIncome: 0,
    maintenanceCost: 0,
    date: `${month}-01`
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await api.post(`/vehicles/${vehicleId}/entries`, form);
      onSubmit(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || 'Failed to save entry');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content entry-modal">
        <h2>Add Entry</h2>
        <form onSubmit={handleSubmit}>
          <label className="field">
            Type
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              <option value="trip">Trip</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </label>

          <label className="field">
            Details
            <textarea
              value={form.details}
              onChange={e => setForm({ ...form, details: e.target.value })}
              required
            />
          </label>

          <label className="field">
            Trip Income
            <input
              type="number"
              value={form.tripIncome}
              onChange={e => setForm({ ...form, tripIncome: Number(e.target.value) })}
              min="0"
            />
          </label>

          <label className="field">
            Maintenance Cost
            <input
              type="number"
              value={form.maintenanceCost}
              onChange={e => setForm({ ...form, maintenanceCost: Number(e.target.value) })}
              min="0"
            />
          </label>

          <label className="field">
            Date
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Submit'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
