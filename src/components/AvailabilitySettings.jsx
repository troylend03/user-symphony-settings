
import React, { useState, useEffect } from 'react';
import '../styles/settings.scss';

const AvailabilitySettings = ({ 
  availability, 
  isAdmin, 
  updateAvailability, 
  isLoading,
  errorMessage,
  successStatus 
}) => {
  const [formData, setFormData] = useState({
    weeklyAvailability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    },
    preferredShifts: [],
    maxHoursPerWeek: '',
    minHoursPerWeek: '',
    preferOvertime: false,
    timeOffRequests: [],
    timeOffBalances: {
      vacation: '',
      sick: '',
      personal: ''
    }
  });

  useEffect(() => {
    if (availability) {
      setFormData({
        ...formData,
        ...availability
      });
    }
  }, [availability]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBalanceChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      timeOffBalances: {
        ...formData.timeOffBalances,
        [name]: value
      }
    });
  };

  const handleAvailabilityChange = (day, timeSlot) => {
    const updatedDayAvailability = [...formData.weeklyAvailability[day]];
    
    // Toggle the time slot
    if (updatedDayAvailability.includes(timeSlot)) {
      const index = updatedDayAvailability.indexOf(timeSlot);
      updatedDayAvailability.splice(index, 1);
    } else {
      updatedDayAvailability.push(timeSlot);
      updatedDayAvailability.sort();
    }
    
    setFormData({
      ...formData,
      weeklyAvailability: {
        ...formData.weeklyAvailability,
        [day]: updatedDayAvailability
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAvailability(formData);
  };

  // Time slots for the availability grid
  const timeSlots = [
    "00:00-04:00", "04:00-08:00", "08:00-12:00", "12:00-16:00", "16:00-20:00", "20:00-24:00"
  ];

  // Days of the week
  const daysOfWeek = [
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
  ];

  // Preferred shifts
  const shiftOptions = [
    { value: 'morning', label: 'Morning (6am-2pm)' },
    { value: 'afternoon', label: 'Afternoon (2pm-10pm)' },
    { value: 'night', label: 'Night (10pm-6am)' },
    { value: 'weekend', label: 'Weekend' },
    { value: 'weekday', label: 'Weekday' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Weekly Availability */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Weekly Availability</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Day</th>
                {timeSlots.map(slot => (
                  <th key={slot} className="py-2 px-4 text-center text-sm">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map(day => (
                <tr key={day} className="border-t">
                  <td className="py-2 px-4 capitalize">{day}</td>
                  {timeSlots.map(slot => (
                    <td key={`${day}-${slot}`} className="py-2 px-4 text-center">
                      <label className="inline-block cursor-pointer w-6 h-6">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.weeklyAvailability[day]?.includes(slot)}
                          onChange={() => handleAvailabilityChange(day, slot)}
                        />
                        <span className="w-6 h-6 inline-block rounded border border-input peer-checked:bg-primary peer-checked:border-primary transition-colors"></span>
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Click on the time slots when you are available to work.
        </p>
      </div>

      {/* Shift Preferences */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Shift Preferences</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="preferredShifts">Preferred Shifts</label>
            <select
              id="preferredShifts"
              name="preferredShifts"
              multiple
              className="settings-input h-32"
              value={formData.preferredShifts || []}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({
                  ...formData,
                  preferredShifts: values
                });
              }}
            >
              {shiftOptions.map(shift => (
                <option key={shift.value} value={shift.value}>{shift.label}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Hold Ctrl/Cmd to select multiple options
            </p>
          </div>

          <div className="settings-section__field">
            <label htmlFor="minHoursPerWeek">Minimum Hours Per Week</label>
            <input
              id="minHoursPerWeek"
              name="minHoursPerWeek"
              type="number"
              min="0"
              max="168"
              className="settings-input"
              value={formData.minHoursPerWeek || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="settings-section__field">
            <label htmlFor="maxHoursPerWeek">Maximum Hours Per Week</label>
            <input
              id="maxHoursPerWeek"
              name="maxHoursPerWeek"
              type="number"
              min="0"
              max="168"
              className="settings-input"
              value={formData.maxHoursPerWeek || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="settings-section__field">
            <div className="flex items-center h-full pt-6">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  name="preferOvertime"
                  checked={formData.preferOvertime || false}
                  onChange={handleInputChange}
                />
                <span className="toggle-track"></span>
                <span className="toggle-label">Available for overtime</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Time Off & Leave */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Time Off & Leave</h3>
        
        <div className="settings-section__grid">
          {/* Balances - Admin can edit, team members can view */}
          <div className="settings-section__field">
            <label htmlFor="vacation">
              Vacation Balance (hours)
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <input
              id="vacation"
              name="vacation"
              type="number"
              min="0"
              className={`settings-input ${!isAdmin ? 'read-only' : ''}`}
              value={formData.timeOffBalances?.vacation || ''}
              onChange={handleBalanceChange}
              readOnly={!isAdmin}
            />
          </div>

          <div className="settings-section__field">
            <label htmlFor="sick">
              Sick Leave Balance (hours)
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <input
              id="sick"
              name="sick"
              type="number"
              min="0"
              className={`settings-input ${!isAdmin ? 'read-only' : ''}`}
              value={formData.timeOffBalances?.sick || ''}
              onChange={handleBalanceChange}
              readOnly={!isAdmin}
            />
          </div>

          <div className="settings-section__field">
            <label htmlFor="personal">
              Personal Leave Balance (hours)
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <input
              id="personal"
              name="personal"
              type="number"
              min="0"
              className={`settings-input ${!isAdmin ? 'read-only' : ''}`}
              value={formData.timeOffBalances?.personal || ''}
              onChange={handleBalanceChange}
              readOnly={!isAdmin}
            />
          </div>
        </div>

        {/* Time Off Requests */}
        <div className="mt-6">
          <h4 className="font-medium mb-2">Pending Time Off Requests</h4>
          
          {formData.timeOffRequests?.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-secondary">
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Start Date</th>
                  <th className="p-2 text-left">End Date</th>
                  <th className="p-2 text-left">Hours</th>
                  <th className="p-2 text-left">Status</th>
                  {isAdmin && <th className="p-2 text-left">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {formData.timeOffRequests.map((request, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 capitalize">{request.type}</td>
                    <td className="p-2">{request.startDate}</td>
                    <td className="p-2">{request.endDate}</td>
                    <td className="p-2">{request.hours}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : request.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="text-xs bg-primary text-white px-2 py-1 rounded"
                            onClick={() => {/* TODO: Approve logic */}}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="text-xs bg-destructive text-white px-2 py-1 rounded"
                            onClick={() => {/* TODO: Deny logic */}}
                          >
                            Deny
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted-foreground">No pending time off requests.</p>
          )}
          
          <button
            type="button"
            className="mt-4 btn-secondary text-sm px-3 py-1"
            onClick={() => {/* TODO: Request time off logic */}}
          >
            Request Time Off
          </button>
        </div>
      </div>

      {/* Form submission */}
      <div className="button-group">
        <button
          type="submit"
          className="btn-primary px-4 py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        
        <button
          type="button"
          className="btn-secondary px-4 py-2"
          onClick={() => setFormData(availability || {})}
        >
          Cancel
        </button>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Success message */}
      {successStatus && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          Availability settings saved successfully.
        </div>
      )}
    </form>
  );
};

export default AvailabilitySettings;
