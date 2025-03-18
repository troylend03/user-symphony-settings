
import React, { useState, useEffect } from 'react';
import '../styles/settings.scss';

const NotificationSettings = ({ 
  notifications, 
  updateNotifications, 
  isLoading,
  errorMessage,
  successStatus 
}) => {
  const [formData, setFormData] = useState({
    channels: {
      email: true,
      push: false,
      sms: false,
    },
    types: {
      schedule_changes: true,
      shift_reminders: true,
      time_off_updates: true,
      shift_swap_requests: true,
      announcements: true,
      payroll: true
    },
    frequency: 'immediate',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  useEffect(() => {
    if (notifications) {
      setFormData({
        ...formData,
        ...notifications
      });
    }
  }, [notifications]);

  const handleChannelChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      channels: {
        ...formData.channels,
        [name]: checked
      }
    });
  };

  const handleTypeChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      types: {
        ...formData.types,
        [name]: checked
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleQuietHoursChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      quietHours: {
        ...formData.quietHours,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNotifications(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Notification Channels */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="email"
                checked={formData.channels?.email || false}
                onChange={handleChannelChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Email Notifications</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="push"
                checked={formData.channels?.push || false}
                onChange={handleChannelChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Push Notifications</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="sms"
                checked={formData.channels?.sms || false}
                onChange={handleChannelChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">SMS Notifications</span>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Types */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Notification Types</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="schedule_changes"
                checked={formData.types?.schedule_changes || false}
                onChange={handleTypeChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Schedule Changes</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="shift_reminders"
                checked={formData.types?.shift_reminders || false}
                onChange={handleTypeChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Shift Reminders</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="time_off_updates"
                checked={formData.types?.time_off_updates || false}
                onChange={handleTypeChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Time Off Updates</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="shift_swap_requests"
                checked={formData.types?.shift_swap_requests || false}
                onChange={handleTypeChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Shift Swap Requests</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="announcements"
                checked={formData.types?.announcements || false}
                onChange={handleTypeChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Announcements</span>
            </label>
          </div>
          
          <div className="flex items-center">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="payroll"
                checked={formData.types?.payroll || false}
                onChange={handleTypeChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Payroll Updates</span>
            </label>
          </div>
        </div>
      </div>

      {/* Notification Frequency */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Notification Frequency</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="frequency">Email Digest Frequency</label>
            <select
              id="frequency"
              name="frequency"
              className="settings-input"
              value={formData.frequency || 'immediate'}
              onChange={handleInputChange}
            >
              <option value="immediate">Immediate (As they happen)</option>
              <option value="hourly">Hourly Digest</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Quiet Hours</h3>
        
        <div className="mb-3">
          <label className="settings-toggle">
            <input
              type="checkbox"
              name="enabled"
              checked={formData.quietHours?.enabled || false}
              onChange={handleQuietHoursChange}
            />
            <span className="toggle-track"></span>
            <span className="toggle-label">Enable Quiet Hours (Do Not Disturb)</span>
          </label>
        </div>
        
        {formData.quietHours?.enabled && (
          <div className="settings-section__grid">
            <div className="settings-section__field">
              <label htmlFor="start">Start Time</label>
              <input
                id="start"
                name="start"
                type="time"
                className="settings-input"
                value={formData.quietHours?.start || '22:00'}
                onChange={handleQuietHoursChange}
              />
            </div>
            
            <div className="settings-section__field">
              <label htmlFor="end">End Time</label>
              <input
                id="end"
                name="end"
                type="time"
                className="settings-input"
                value={formData.quietHours?.end || '08:00'}
                onChange={handleQuietHoursChange}
              />
            </div>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground mt-2">
          During quiet hours, you will not receive push notifications or SMS. 
          Email digests will still be delivered according to your selected frequency.
        </p>
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
          onClick={() => setFormData(notifications || {})}
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
          Notification settings saved successfully.
        </div>
      )}
    </form>
  );
};

export default NotificationSettings;
