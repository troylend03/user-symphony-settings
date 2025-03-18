
import React, { useState, useEffect } from 'react';
import '../styles/settings.scss';

const OptionalSettings = ({ 
  optionalSettings, 
  updateOptionalSettings, 
  isLoading,
  errorMessage,
  successStatus 
}) => {
  const [formData, setFormData] = useState({
    customFields: {},
    devices: [],
    multiSiteAccess: {
      enabled: false,
      defaultSite: '',
      accessibleSites: []
    }
  });

  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    if (optionalSettings) {
      setFormData({
        ...formData,
        ...optionalSettings
      });
      
      // Convert customFields object to array for display and editing
      if (optionalSettings.customFields) {
        const fieldsArray = Object.entries(optionalSettings.customFields).map(([key, value]) => ({
          id: key,
          value
        }));
        setCustomFields(fieldsArray);
      }
    }
  }, [optionalSettings]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., multiSiteAccess.enabled)
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

  const handleMultiSiteChange = (e) => {
    const { name, value, checked, type } = e.target;
    
    setFormData({
      ...formData,
      multiSiteAccess: {
        ...formData.multiSiteAccess,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };

  const handleAccessibleSitesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    
    setFormData({
      ...formData,
      multiSiteAccess: {
        ...formData.multiSiteAccess,
        accessibleSites: selectedOptions
      }
    });
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setCustomFields(updatedFields);
    
    // Update the formData.customFields object
    const customFieldsObject = {};
    updatedFields.forEach(field => {
      customFieldsObject[field.id] = field.value;
    });
    
    setFormData({
      ...formData,
      customFields: customFieldsObject
    });
  };

  const handleAddDevice = () => {
    const newDevice = {
      id: Date.now().toString(),
      name: '',
      type: 'mobile',
      lastLogin: new Date().toISOString()
    };
    
    setFormData({
      ...formData,
      devices: [...(formData.devices || []), newDevice]
    });
  };

  const handleDeviceChange = (index, field, value) => {
    const updatedDevices = [...(formData.devices || [])];
    updatedDevices[index] = {
      ...updatedDevices[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      devices: updatedDevices
    });
  };

  const handleRemoveDevice = (index) => {
    const updatedDevices = [...(formData.devices || [])];
    updatedDevices.splice(index, 1);
    
    setFormData({
      ...formData,
      devices: updatedDevices
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOptionalSettings(formData);
  };

  // Sample sites for multi-site access
  const availableSites = [
    { id: 'site1', name: 'Main Office' },
    { id: 'site2', name: 'Warehouse' },
    { id: 'site3', name: 'Retail Store #1' },
    { id: 'site4', name: 'Retail Store #2' },
    { id: 'site5', name: 'Distribution Center' },
  ];

  // Custom fields from the organization (example)
  const organizationCustomFields = [
    { id: 'uniform_size', label: 'Uniform Size' },
    { id: 'parking_pass', label: 'Parking Pass Number' },
    { id: 'employee_number', label: 'Employee Number' },
    { id: 'locker_number', label: 'Locker Number' },
    { id: 'certifications', label: 'Certifications' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Custom Fields */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Custom Fields</h3>
        
        <div className="space-y-4">
          {organizationCustomFields.map((field, index) => {
            // Find the custom field in our state if it exists
            const existingField = customFields.find(f => f.id === field.id);
            
            return (
              <div key={field.id} className="settings-section__field">
                <label htmlFor={`custom-${field.id}`}>{field.label}</label>
                <input
                  id={`custom-${field.id}`}
                  type="text"
                  className="settings-input"
                  value={existingField ? existingField.value : ''}
                  onChange={(e) => {
                    // If field exists, update it, otherwise add it
                    if (existingField) {
                      const fieldIndex = customFields.findIndex(f => f.id === field.id);
                      handleCustomFieldChange(fieldIndex, e.target.value);
                    } else {
                      setCustomFields([...customFields, { id: field.id, value: e.target.value }]);
                      // Also update formData directly
                      setFormData({
                        ...formData,
                        customFields: {
                          ...formData.customFields,
                          [field.id]: e.target.value
                        }
                      });
                    }
                  }}
                  placeholder={`Enter ${field.label}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Device Management */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Device Management</h3>
        
        {formData.devices?.length > 0 ? (
          <div className="space-y-4">
            {formData.devices.map((device, index) => (
              <div key={device.id} className="p-4 bg-background border rounded-md">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Device {index + 1}</h4>
                  <button
                    type="button"
                    className="text-destructive hover:text-destructive/80"
                    onClick={() => handleRemoveDevice(index)}
                  >
                    Remove
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="settings-section__field">
                    <label htmlFor={`device-name-${index}`}>Device Name</label>
                    <input
                      id={`device-name-${index}`}
                      type="text"
                      className="settings-input"
                      value={device.name || ''}
                      onChange={(e) => handleDeviceChange(index, 'name', e.target.value)}
                      placeholder="My iPhone, Work Laptop, etc."
                    />
                  </div>
                  
                  <div className="settings-section__field">
                    <label htmlFor={`device-type-${index}`}>Device Type</label>
                    <select
                      id={`device-type-${index}`}
                      className="settings-input"
                      value={device.type || 'mobile'}
                      onChange={(e) => handleDeviceChange(index, 'type', e.target.value)}
                    >
                      <option value="mobile">Mobile Phone</option>
                      <option value="tablet">Tablet</option>
                      <option value="laptop">Laptop</option>
                      <option value="desktop">Desktop</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Last Login: {new Date(device.lastLogin).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mb-4">No devices registered.</p>
        )}
        
        <button
          type="button"
          className="btn-secondary px-4 py-2 text-sm"
          onClick={handleAddDevice}
        >
          Register New Device
        </button>
      </div>

      {/* Multi-Site Management */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Multi-Site Management</h3>
        
        <div className="mb-4">
          <label className="settings-toggle">
            <input
              type="checkbox"
              name="enabled"
              checked={formData.multiSiteAccess?.enabled || false}
              onChange={handleMultiSiteChange}
            />
            <span className="toggle-track"></span>
            <span className="toggle-label">Enable Multi-Site Access</span>
          </label>
        </div>
        
        {formData.multiSiteAccess?.enabled && (
          <div className="space-y-4">
            <div className="settings-section__field">
              <label htmlFor="defaultSite">Default Site</label>
              <select
                id="defaultSite"
                name="defaultSite"
                className="settings-input"
                value={formData.multiSiteAccess?.defaultSite || ''}
                onChange={handleMultiSiteChange}
              >
                <option value="">Select default site...</option>
                {availableSites.map(site => (
                  <option key={site.id} value={site.id}>{site.name}</option>
                ))}
              </select>
            </div>
            
            <div className="settings-section__field">
              <label htmlFor="accessibleSites">Accessible Sites</label>
              <select
                id="accessibleSites"
                name="accessibleSites"
                multiple
                className="settings-input h-32"
                value={formData.multiSiteAccess?.accessibleSites || []}
                onChange={handleAccessibleSitesChange}
              >
                {availableSites.map(site => (
                  <option key={site.id} value={site.id}>{site.name}</option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Hold Ctrl/Cmd to select multiple sites
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Form submission */}
      <div className="button-group">
        <button
          type="submit"
          className="btn-primary px-4 py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Optional Settings'}
        </button>
        
        <button
          type="button"
          className="btn-secondary px-4 py-2"
          onClick={() => {
            setFormData(optionalSettings || {});
            // Reset custom fields array too
            if (optionalSettings?.customFields) {
              const fieldsArray = Object.entries(optionalSettings.customFields).map(([key, value]) => ({
                id: key,
                value
              }));
              setCustomFields(fieldsArray);
            } else {
              setCustomFields([]);
            }
          }}
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
          Optional settings saved successfully.
        </div>
      )}
    </form>
  );
};

export default OptionalSettings;
