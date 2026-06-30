// VehicleDetails.js
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import api from '../../api/axios';
import '../../styles/Page.css';
import '../../styles/VehicleDetails.css';
import '../../components/modal.css';
import EntryModal from '../../components/EntryModal';

function VehicleDetails() {
  const { id } = useParams(); // vehicle id from route
  const { user } = useOutletContext?.() || {}; // if you pass user via Outlet context
  const [vehicle, setVehicle] = useState(null);
  const [entries, setEntries] = useState([]); // all entries for selected month
  const [loading, setLoading] = useState(true);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
  });

  // Fetch vehicle basic info
  useEffect(() => {
    let mounted = true;
    const fetchVehicle = async () => {
      try {
        const res = await api.get(`/vehicles/${id}`);
        if (mounted) setVehicle(res.data);
      } catch (err) {
        console.error('Failed to fetch vehicle', err);
      }
    };
    fetchVehicle();
    return () => { mounted = false; };
  }, [id]);

  // Fetch entries for selected month
  useEffect(() => {
    let mounted = true;
    const fetchEntries = async () => {
      setLoading(true);
      try {
        // backend expected: GET /vehicles/:id/entries?month=YYYY-MM
        const res = await api.get(`/vehicles/${id}/entries`, {
          params: { month: selectedMonth }
        });
        if (mounted) setEntries(res.data || []);
      } catch (err) {
        console.error('Failed to fetch entries', err);
        if (mounted) setEntries([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchEntries();
    return () => { mounted = false; };
  }, [id, selectedMonth]);

  // Derived metrics
  const monthlyMaintenance = useMemo(() => {
    return entries.reduce((sum, e) => sum + (Number(e.maintenanceCost) || 0), 0);
  }, [entries]);

  const monthlyTripIncome = useMemo(() => {
    return entries.reduce((sum, e) => sum + (Number(e.tripIncome) || 0), 0);
  }, [entries]);

  const netIncome = monthlyTripIncome - monthlyMaintenance;

  // Add new entry handler (called after successful POST)
  const handleAddEntry = (newEntry) => {
    // keep entries in current month view
    setEntries(prev => [newEntry, ...prev]);
  };

  // Delete entry (optional)
  const handleDeleteEntry = async (entryId) => {
    try {
      await api.delete(`/vehicles/${id}/entries/${entryId}`);
      setEntries(prev => prev.filter(e => e._id !== entryId));
    } catch (err) {
      console.error('Failed to delete entry', err);
    }
  };

  return (
    <div className="vehicle-details-page page-container">
      <header className="vehicle-header">
        <div>
          <h1>{vehicle ? vehicle.vehicleName : 'Vehicle'}</h1>
          <div className="vehicle-sub">{vehicle ? `Plate: ${vehicle.plateNumber}` : ''}</div>
        </div>

        <div className="header-controls">
          <label className="month-picker">
            Month 
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </label>
        </div>
      </header>

      <section className="monthly-metrics">

        <div className="metric-card">
          <div className="metric-title">Monthly Trip Income</div>
          <div className="metric-value positive">{monthlyTripIncome.toLocaleString()}</div>
        </div>

        <div className="metric-card">
          <div className="metric-title">Monthly Maintenance Cost</div>
          <div className="metric-value negative">{monthlyMaintenance.toLocaleString()}</div>
        </div>

        <div className="metric-card">
          <div className="metric-title">Net Income</div>
          <div className={`metric-value ${netIncome < 0 ? 'negative' : 'positive'}`}>
            {netIncome.toLocaleString()}
          </div>
        </div>
      </section>

      <section className="entries-section">
        <div className="entries-header">
          <h3>Entries</h3>
          <div className="entries-actions">
            <button className="primary-btn" onClick={() => setShowEntryModal(true)}>Add Entry</button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading entries...</div>
        ) : (
          <div className="entries-table-wrapper">
            <table className="entries-table">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Trip Income</th>
                  <th>Maintenance Cost</th>
                  <th>Date</th>
                  {user?.role?.toLowerCase() === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr><td colSpan={user?.role?.toLowerCase() === 'admin' ? 5 : 4} className="no-data">No entries for this month</td></tr>
                ) : entries.map(entry => (
                  <tr key={entry._id}>
                    <td>
                      <span className={`entry-tag ${entry.type === 'maintenance' ? 'tag-maint' : 'tag-trip'}`}>
                        {entry.type}
                      </span>
                      <div className="entry-details">{entry.details}</div>
                    </td>
                    <td className="numeric">{Number(entry.tripIncome || 0).toLocaleString()}</td>
                    <td className="numeric">{Number(entry.maintenanceCost || 0).toLocaleString()}</td>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    {user?.role?.toLowerCase() === 'admin' && (
                      <td>
                        <button className="link-btn" onClick={() => {/* optional edit entry */}}>Edit</button>
                        <button className="link-btn danger" onClick={() => handleDeleteEntry(entry._id)}>Delete</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showEntryModal && (
        <EntryModal
          vehicleId={id}
          month={selectedMonth}
          onClose={() => setShowEntryModal(false)}
          onSubmit={handleAddEntry}
        />
      )}
    </div>
  );
}

export default VehicleDetails;
