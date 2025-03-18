
import React, { useState, useEffect } from 'react';
import '../styles/settings.scss';

const SecuritySettings = ({ 
  security, 
  updateSecurity, 
  isLoading,
  errorMessage,
  successStatus 
}) => {
  const [formData, setFormData] = useState({
    password: {
      current: '',
      new: '',
      confirm: ''
    },
    mfa: {
      enabled: false,
      method: 'app',
      phone: ''
    },
    privacySettings: {
      profileVisibility: 'team',
      shareContactInfo: false
    },
    loginHistory: []
  });

  const [passwordErrors, setPasswordErrors] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  useEffect(() => {
    if (security) {
      setFormData({
        ...formData,
        mfa: security.mfa || formData.mfa,
        privacySettings: security.privacySettings || formData.privacySettings,
        loginHistory: security.loginHistory || []
      });
    }
  }, [security]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleMfaChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      mfa: {
        ...formData.mfa,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };

  const handlePrivacyChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      privacySettings: {
        ...formData.privacySettings,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      password: {
        ...formData.password,
        [name]: value
      }
    });
  };

  const validatePasswordForm = () => {
    let isValid = true;
    const errors = {
      current: '',
      new: '',
      confirm: ''
    };
    
    // Validate current password
    if (!formData.password.current) {
      errors.current = 'Current password is required';
      isValid = false;
    }
    
    // Validate new password
    if (formData.password.new) {
      if (formData.password.new.length < 8) {
        errors.new = 'Password must be at least 8 characters';
        isValid = false;
      }
      
      // Check for complexity requirements
      const hasUpperCase = /[A-Z]/.test(formData.password.new);
      const hasLowerCase = /[a-z]/.test(formData.password.new);
      const hasNumbers = /\d/.test(formData.password.new);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password.new);
      
      if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars)) {
        errors.new = 'Password must include uppercase, lowercase, number, and special character';
        isValid = false;
      }
    } else {
      errors.new = 'New password is required';
      isValid = false;
    }
    
    // Check if passwords match
    if (formData.password.new !== formData.password.confirm) {
      errors.confirm = 'Passwords do not match';
      isValid = false;
    }
    
    setPasswordErrors(errors);
    return isValid;
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      updateSecurity({
        ...security,
        passwordChange: {
          currentPassword: formData.password.current,
          newPassword: formData.password.new
        }
      });
      
      // Clear password fields after submission
      setFormData({
        ...formData,
        password: {
          current: '',
          new: '',
          confirm: ''
        }
      });
    }
  };
  
  const handleMfaSubmit = (e) => {
    e.preventDefault();
    updateSecurity({
      ...security,
      mfa: formData.mfa
    });
  };
  
  const handlePrivacySubmit = (e) => {
    e.preventDefault();
    updateSecurity({
      ...security,
      privacySettings: formData.privacySettings
    });
  };

  // Format date for login history
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      {/* Password Change */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        
        <form onSubmit={handleChangePassword}>
          <div className="space-y-4 max-w-md">
            <div className="settings-section__field">
              <label htmlFor="current">Current Password</label>
              <input
                id="current"
                name="current"
                type="password"
                className={`settings-input ${passwordErrors.current ? 'border-destructive' : ''}`}
                value={formData.password.current}
                onChange={handlePasswordChange}
              />
              {passwordErrors.current && (
                <p className="text-xs text-destructive mt-1">{passwordErrors.current}</p>
              )}
            </div>
            
            <div className="settings-section__field">
              <label htmlFor="new">New Password</label>
              <input
                id="new"
                name="new"
                type="password"
                className={`settings-input ${passwordErrors.new ? 'border-destructive' : ''}`}
                value={formData.password.new}
                onChange={handlePasswordChange}
              />
              {passwordErrors.new && (
                <p className="text-xs text-destructive mt-1">{passwordErrors.new}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 8 characters with uppercase, lowercase, number, and special character.
              </p>
            </div>
            
            <div className="settings-section__field">
              <label htmlFor="confirm">Confirm New Password</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                className={`settings-input ${passwordErrors.confirm ? 'border-destructive' : ''}`}
                value={formData.password.confirm}
                onChange={handlePasswordChange}
              />
              {passwordErrors.confirm && (
                <p className="text-xs text-destructive mt-1">{passwordErrors.confirm}</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                className="btn-primary px-4 py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Multi-Factor Authentication */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Multi-Factor Authentication (MFA)</h3>
        
        <form onSubmit={handleMfaSubmit}>
          <div className="mb-4">
            <label className="settings-toggle">
              <input
                type="checkbox"
                name="enabled"
                checked={formData.mfa?.enabled || false}
                onChange={handleMfaChange}
              />
              <span className="toggle-track"></span>
              <span className="toggle-label">Enable Multi-Factor Authentication</span>
            </label>
          </div>
          
          {formData.mfa?.enabled && (
            <div className="space-y-4 max-w-md">
              <div className="settings-section__field">
                <label htmlFor="mfa-method">Authentication Method</label>
                <select
                  id="mfa-method"
                  name="method"
                  className="settings-input"
                  value={formData.mfa?.method || 'app'}
                  onChange={handleMfaChange}
                >
                  <option value="app">Authenticator App</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                </select>
              </div>
              
              {formData.mfa?.method === 'sms' && (
                <div className="settings-section__field">
                  <label htmlFor="mfa-phone">Phone Number</label>
                  <input
                    id="mfa-phone"
                    name="phone"
                    type="tel"
                    className="settings-input"
                    value={formData.mfa?.phone || ''}
                    onChange={handleMfaChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              )}
              
              {formData.mfa?.method === 'app' && (
                <div className="p-4 bg-secondary rounded-md">
                  <p className="mb-2 text-sm">Scan this QR code with your authenticator app:</p>
                  <div className="w-48 h-48 bg-white flex items-center justify-center border">
                    <p className="text-xs text-muted-foreground">QR Code placeholder</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    After scanning, enter the 6-digit code from your app to verify setup.
                  </p>
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  className="btn-primary px-4 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save MFA Settings'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Privacy & Sharing */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Privacy & Sharing</h3>
        
        <form onSubmit={handlePrivacySubmit}>
          <div className="space-y-4 max-w-md">
            <div className="settings-section__field">
              <label htmlFor="profileVisibility">Profile Visibility</label>
              <select
                id="profileVisibility"
                name="profileVisibility"
                className="settings-input"
                value={formData.privacySettings?.profileVisibility || 'team'}
                onChange={handlePrivacyChange}
              >
                <option value="public">Public (All Organization Members)</option>
                <option value="team">Team Only</option>
                <option value="private">Private (Admins & Managers Only)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  name="shareContactInfo"
                  checked={formData.privacySettings?.shareContactInfo || false}
                  onChange={handlePrivacyChange}
                />
                <span className="toggle-track"></span>
                <span className="toggle-label">Share contact information with team members</span>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                className="btn-primary px-4 py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Privacy Settings'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Login History */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Login History</h3>
        
        {formData.loginHistory?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="p-2 text-left">Date & Time</th>
                  <th className="p-2 text-left">IP Address</th>
                  <th className="p-2 text-left">Device</th>
                  <th className="p-2 text-left">Location</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {formData.loginHistory.map((login, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{formatDate(login.timestamp)}</td>
                    <td className="p-2">{login.ipAddress}</td>
                    <td className="p-2">{login.device}</td>
                    <td className="p-2">{login.location}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        login.status === 'success' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {login.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground">No login history available.</p>
        )}
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
          Security settings updated successfully.
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;
