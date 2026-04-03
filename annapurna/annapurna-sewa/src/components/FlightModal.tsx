import React, { useState, useEffect } from 'react';
import { AirportInput } from './AirportInput';
import { isValidAirport, sanitizeInput, openWhatsApp, getTomorrowDateString, getTodayDateString } from '../utils';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export const FlightModal: React.FC<Props> = ({ open, onClose, onSuccess, onError }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState(getTomorrowDateString());
  const [passengers, setPassengers] = useState('1');
  const [tripType, setTripType] = useState('1');
  const [dateError, setDateError] = useState('');

  // Reset scroll and lock body on open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [open]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDate(val);
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    setDateError(selected < today ? '⚠️ Selected date is in the past. Please choose a future date.' : '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to || !date || !passengers) { onError('Please fill in all fields'); return; }
    if (!isValidAirport(from)) { onError('❌ Please select departure airport from the dropdown'); return; }
    if (!isValidAirport(to)) { onError('❌ Please select arrival airport from the dropdown'); return; }

    const selected = new Date(date);
    const today = new Date(); today.setHours(0,0,0,0); selected.setHours(0,0,0,0);
    if (selected < today) { onError('❌ Cannot book flights in the past. Please select a future date.'); return; }
    if (from.toLowerCase() === to.toLowerCase()) { onError('❌ Departure and arrival airports cannot be the same!'); return; }

    const safeFrom = sanitizeInput(from);
    const safeTo = sanitizeInput(to);
    const safePassengers = sanitizeInput(passengers, 20);
    const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const message = `FLIGHT BOOKING REQUEST:\n\n• From: ${safeFrom}\n• To: ${safeTo}\n• Travel Date: ${formattedDate}\n• Passengers: ${safePassengers}\n\nPlease book the flight for me and provide the details.`;

    if (openWhatsApp(message)) {
      onClose();
      setFrom(''); setTo(''); setDate(getTomorrowDateString()); setPassengers('1');
      onSuccess(`Flight booking request sent for ${safeFrom} to ${safeTo}`);
    } else {
      onError('Unable to open WhatsApp. Please try again.');
    }
  };

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      style={{ display: 'block' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal
      aria-labelledby="modalTitle"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="modalTitle"><i className="fas fa-plane" /> Flight Ticket Booking</h3>
          <button className="close-modal" onClick={onClose} aria-label="Close modal">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <AirportInput
            id="fromLocation"
            value={from}
            onChange={setFrom}
            placeholder="e.g., Kathmandu, Nepal"
            label="Departure From"
            icon="fas fa-plane-departure"
            hint="Start typing to search airports"
          />
          <AirportInput
            id="toLocation"
            value={to}
            onChange={setTo}
            placeholder="e.g., Doha, Qatar"
            label="Destination To"
            icon="fas fa-plane-arrival"
            hint="Start typing to search airports"
          />

          <div className="form-group">
            <label htmlFor="travelDate"><i className="fas fa-calendar-alt" /> Preferred Travel Date</label>
            <input
              id="travelDate"
              type="date"
              className="form-control"
              value={date}
              min={getTodayDateString()}
              onChange={handleDateChange}
              required
              style={dateError ? { borderColor: '#dc2626', boxShadow: '0 0 0 2px rgba(220,38,38,0.2)' } : {}}
            />
            {dateError && <div className="form-note" style={{ color: '#dc2626' }}>{dateError}</div>}
            {!dateError && <div className="form-note">Select your preferred departure date</div>}
          </div>

          <div className="form-group">
            <label htmlFor="passengers"><i className="fas fa-users" /> Number of Passengers</label>
            <select id="passengers" className="form-control" value={passengers} onChange={e => setPassengers(e.target.value)} required>
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
              <option value="4">4 Passengers</option>
              <option value="5+">5+ Passengers (Contact for details)</option>
            </select>
            <select id="trip" className="form-control" value={tripType} onChange={e => setTripType(e.target.value)} required style={{ marginTop: 8 }}>
              <option value="1">One Way Trip</option>
              <option value="2">Round Trip</option>
            </select>
          </div>

          <button type="submit" className="btn primary-btn">
            <i className="fab fa-whatsapp" /> Send Request via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
