
import React, { useState, useEffect } from 'react';
import '../styles/settings.scss';

const ProfileSettings = ({ 
  profile, 
  isAdmin, 
  updateProfile, 
  isLoading,
  errorMessage,
  successStatus 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    preferredName: '',
    email: '',
    phone: '',
    jobTitle: '',
    employeeId: '',
    startDate: '',
    endDate: '',
    employmentStatus: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    preferences: {
      language: 'english',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      displayMode: 'light',
    }
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        ...formData,
        ...profile
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [name]: value
      }
    });
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      emergencyContact: {
        ...formData.emergencyContact,
        [name]: value
      }
    });
  };

  const handleProfilePhotoChange = (e) => {
    // TODO: Implement file upload
    console.log("File selected:", e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  // List of timezones (simplified)
  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Anchorage', label: 'Alaska Time (AKT)' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  // Date formats
  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];

  // Languages
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'japanese', label: 'Japanese' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="settings-input"
              value={formData.firstName || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="settings-input"
              value={formData.lastName || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="settings-section__field">
            <label htmlFor="preferredName">Preferred Name</label>
            <input
              id="preferredName"
              name="preferredName"
              type="text"
              className="settings-input"
              value={formData.preferredName || ''}
              onChange={handleInputChange}
              placeholder="Optional"
            />
          </div>

          <div className="settings-section__field">
            <label htmlFor="profilePhoto">Profile Photo</label>
            <input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/*"
              className="settings-input pt-1.5"
              onChange={handleProfilePhotoChange}
            />
          </div>
        </div>
      </div>

      {/* Employment Information */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Employment Information</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="jobTitle">
              Job Title
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              className={`settings-input ${!isAdmin ? 'read-only' : ''}`}
              value={formData.jobTitle || ''}
              onChange={handleInputChange}
              readOnly={!isAdmin}
            />
          </div>

          <div className="settings-section__field">
            <label htmlFor="employeeId">
              Employee ID
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              className={`settings-input ${!isAdmin ? 'read-only' : ''}`}
              value={formData.employeeId || ''}
              onChange={handleInputChange}
              readOnly={!isAdmin}
            />
          </div>

          {isAdmin && (
            <>
              <div className="settings-section__field">
                <label htmlFor="employmentStatus">Employment Status</label>
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  className="settings-input"
                  value={formData.employmentStatus || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select status...</option>
                  <option value="active">Active</option>
                  <option value="on_leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </>
          )}

          <div className="settings-section__field">
            <label htmlFor="startDate">
              Start Date
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              className={`settings-input ${!isAdmin ? 'read-only' : ''}`}
              value={formData.startDate || ''}
              onChange={handleInputChange}
              readOnly={!isAdmin}
            />
          </div>

          {formData.employmentStatus === 'terminated' && isAdmin && (
            <div className="settings-section__field">
              <label htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className="settings-input"
                value={formData.endDate || ''}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className="settings-input"
              value={formData.email || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="settings-input"
              value={formData.phone || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="emergency-name">Name</label>
            <input
              id="emergency-name"
              name="name"
              type="text"
              className="settings-input"
              value={formData.emergencyContact?.name || ''}
              onChange={handleEmergencyContactChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="emergency-relationship">Relationship</label>
            <input
              id="emergency-relationship"
              name="relationship"
              type="text"
              className="settings-input"
              value={formData.emergencyContact?.relationship || ''}
              onChange={handleEmergencyContactChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="emergency-phone">Phone Number</label>
            <input
              id="emergency-phone"
              name="phone"
              type="tel"
              className="settings-input"
              value={formData.emergencyContact?.phone || ''}
              onChange={handleEmergencyContactChange}
            />
          </div>
        </div>
      </div>

      {/* Personal Preferences */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Personal Preferences</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              className="settings-input"
              value={formData.preferences?.language || 'english'}
              onChange={handlePreferenceChange}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="timezone">Time Zone</label>
            <select
              id="timezone"
              name="timezone"
              className="settings-input"
              value={formData.preferences?.timezone || 'America/New_York'}
              onChange={handlePreferenceChange}
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>{tz.label}</option>
              ))}
            </select>
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="dateFormat">Date Format</label>
            <select
              id="dateFormat"
              name="dateFormat"
              className="settings-input"
              value={formData.preferences?.dateFormat || 'MM/DD/YYYY'}
              onChange={handlePreferenceChange}
            >
              {dateFormats.map(format => (
                <option key={format.value} value={format.value}>{format.label}</option>
              ))}
            </select>
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="displayMode">Display Mode</label>
            <select
              id="displayMode"
              name="displayMode"
              className="settings-input"
              value={formData.preferences?.displayMode || 'light'}
              onChange={handlePreferenceChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
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
          onClick={() => setFormData(profile || {})}
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
          Profile settings saved successfully.
        </div>
      )}
    </form>
  );
};

export default ProfileSettings;
