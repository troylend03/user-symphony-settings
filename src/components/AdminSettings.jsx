
import React, { useState, useEffect } from 'react';
import '../styles/settings.scss';

const AdminSettings = ({ 
  adminSettings, 
  updateAdminSettings, 
  isLoading,
  errorMessage,
  successStatus 
}) => {
  const [formData, setFormData] = useState({
    scheduling: {
      minHoursPerShift: 4,
      maxHoursPerShift: 12,
      minHoursPerWeek: 0,
      maxHoursPerWeek: 40,
      maxConsecutiveDays: 6,
      minBreakTime: 30,
      overtimeThreshold: 40
    },
    shiftSwaps: {
      requireApproval: true,
      allowDirectSwaps: false,
      maxAdvanceSwapDays: 14,
    },
    compliance: {
      enforceMinimumRest: true,
      minimumRestHours: 10,
      laborLawRegion: 'us_federal',
      unionRules: false
    },
    departments: [],
    groups: []
  });

  useEffect(() => {
    if (adminSettings) {
      setFormData({
        ...formData,
        ...adminSettings
      });
    }
  }, [adminSettings]);

  const handleSchedulingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      scheduling: {
        ...formData.scheduling,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
      }
    });
  };

  const handleSwapsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      shiftSwaps: {
        ...formData.shiftSwaps,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
      }
    });
  };

  const handleComplianceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      compliance: {
        ...formData.compliance,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
      }
    });
  };

  const handleDepartmentAdd = () => {
    const newDept = {
      id: Date.now().toString(),
      name: '',
      manager: '',
      description: ''
    };
    
    setFormData({
      ...formData,
      departments: [...formData.departments, newDept]
    });
  };

  const handleDepartmentChange = (index, field, value) => {
    const updatedDepartments = [...formData.departments];
    updatedDepartments[index] = {
      ...updatedDepartments[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      departments: updatedDepartments
    });
  };

  const handleDepartmentRemove = (index) => {
    const updatedDepartments = [...formData.departments];
    updatedDepartments.splice(index, 1);
    
    setFormData({
      ...formData,
      departments: updatedDepartments
    });
  };

  const handleGroupAdd = () => {
    const newGroup = {
      id: Date.now().toString(),
      name: '',
      description: ''
    };
    
    setFormData({
      ...formData,
      groups: [...formData.groups, newGroup]
    });
  };

  const handleGroupChange = (index, field, value) => {
    const updatedGroups = [...formData.groups];
    updatedGroups[index] = {
      ...updatedGroups[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      groups: updatedGroups
    });
  };

  const handleGroupRemove = (index) => {
    const updatedGroups = [...formData.groups];
    updatedGroups.splice(index, 1);
    
    setFormData({
      ...formData,
      groups: updatedGroups
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAdminSettings(formData);
  };

  // Labor law regions for compliance settings
  const laborLawRegions = [
    { value: 'us_federal', label: 'US Federal' },
    { value: 'ca_federal', label: 'Canada Federal' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'eu', label: 'European Union' },
    { value: 'au', label: 'Australia' },
    { value: 'other', label: 'Other (Custom)' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Scheduling Rules */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Scheduling Rules</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="minHoursPerShift">Minimum Hours Per Shift</label>
            <input
              id="minHoursPerShift"
              name="minHoursPerShift"
              type="number"
              min="0"
              max="24"
              className="settings-input"
              value={formData.scheduling?.minHoursPerShift || 0}
              onChange={handleSchedulingChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="maxHoursPerShift">Maximum Hours Per Shift</label>
            <input
              id="maxHoursPerShift"
              name="maxHoursPerShift"
              type="number"
              min="1"
              max="24"
              className="settings-input"
              value={formData.scheduling?.maxHoursPerShift || 0}
              onChange={handleSchedulingChange}
            />
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
              value={formData.scheduling?.minHoursPerWeek || 0}
              onChange={handleSchedulingChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="maxHoursPerWeek">Maximum Hours Per Week</label>
            <input
              id="maxHoursPerWeek"
              name="maxHoursPerWeek"
              type="number"
              min="1"
              max="168"
              className="settings-input"
              value={formData.scheduling?.maxHoursPerWeek || 0}
              onChange={handleSchedulingChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="maxConsecutiveDays">Maximum Consecutive Days</label>
            <input
              id="maxConsecutiveDays"
              name="maxConsecutiveDays"
              type="number"
              min="1"
              max="14"
              className="settings-input"
              value={formData.scheduling?.maxConsecutiveDays || 0}
              onChange={handleSchedulingChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="minBreakTime">Minimum Break Time (minutes)</label>
            <input
              id="minBreakTime"
              name="minBreakTime"
              type="number"
              min="0"
              max="120"
              className="settings-input"
              value={formData.scheduling?.minBreakTime || 0}
              onChange={handleSchedulingChange}
            />
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="overtimeThreshold">Overtime Threshold (hours/week)</label>
            <input
              id="overtimeThreshold"
              name="overtimeThreshold"
              type="number"
              min="0"
              max="168"
              className="settings-input"
              value={formData.scheduling?.overtimeThreshold || 0}
              onChange={handleSchedulingChange}
            />
          </div>
        </div>
      </div>

      {/* Shift Swaps & Approval Rules */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Shift Swaps & Approval Rules</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <div className="flex items-center h-full pt-6">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  name="requireApproval"
                  checked={formData.shiftSwaps?.requireApproval || false}
                  onChange={handleSwapsChange}
                />
                <span className="toggle-track"></span>
                <span className="toggle-label">Require manager approval for shift swaps</span>
              </label>
            </div>
          </div>
          
          <div className="settings-section__field">
            <div className="flex items-center h-full pt-6">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  name="allowDirectSwaps"
                  checked={formData.shiftSwaps?.allowDirectSwaps || false}
                  onChange={handleSwapsChange}
                />
                <span className="toggle-track"></span>
                <span className="toggle-label">Allow direct team member swaps</span>
              </label>
            </div>
          </div>
          
          <div className="settings-section__field">
            <label htmlFor="maxAdvanceSwapDays">Maximum Advance Swap Days</label>
            <input
              id="maxAdvanceSwapDays"
              name="maxAdvanceSwapDays"
              type="number"
              min="1"
              max="90"
              className="settings-input"
              value={formData.shiftSwaps?.maxAdvanceSwapDays || 14}
              onChange={handleSwapsChange}
            />
          </div>
        </div>
      </div>

      {/* Compliance & Labor Law Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Compliance & Labor Law Settings</h3>
        
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <div className="flex items-center h-full pt-6">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  name="enforceMinimumRest"
                  checked={formData.compliance?.enforceMinimumRest || false}
                  onChange={handleComplianceChange}
                />
                <span className="toggle-track"></span>
                <span className="toggle-label">Enforce minimum rest between shifts</span>
              </label>
            </div>
          </div>
          
          {formData.compliance?.enforceMinimumRest && (
            <div className="settings-section__field">
              <label htmlFor="minimumRestHours">Minimum Rest Hours</label>
              <input
                id="minimumRestHours"
                name="minimumRestHours"
                type="number"
                min="0"
                max="24"
                className="settings-input"
                value={formData.compliance?.minimumRestHours || 0}
                onChange={handleComplianceChange}
              />
            </div>
          )}
          
          <div className="settings-section__field">
            <label htmlFor="laborLawRegion">Labor Law Region</label>
            <select
              id="laborLawRegion"
              name="laborLawRegion"
              className="settings-input"
              value={formData.compliance?.laborLawRegion || 'us_federal'}
              onChange={handleComplianceChange}
            >
              {laborLawRegions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="settings-section__field">
            <div className="flex items-center h-full pt-6">
              <label className="settings-toggle">
                <input
                  type="checkbox"
                  name="unionRules"
                  checked={formData.compliance?.unionRules || false}
                  onChange={handleComplianceChange}
                />
                <span className="toggle-track"></span>
                <span className="toggle-label">Enable union contract rules</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Department Management */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Department Management</h3>
        
        {formData.departments?.map((department, index) => (
          <div key={department.id} className="mb-4 p-4 bg-background border rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Department {index + 1}</h4>
              <button
                type="button"
                className="text-destructive hover:text-destructive/80"
                onClick={() => handleDepartmentRemove(index)}
              >
                Remove
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="settings-section__field">
                <label htmlFor={`dept-name-${index}`}>Department Name</label>
                <input
                  id={`dept-name-${index}`}
                  type="text"
                  className="settings-input"
                  value={department.name || ''}
                  onChange={(e) => handleDepartmentChange(index, 'name', e.target.value)}
                />
              </div>
              
              <div className="settings-section__field">
                <label htmlFor={`dept-manager-${index}`}>Department Manager</label>
                <input
                  id={`dept-manager-${index}`}
                  type="text"
                  className="settings-input"
                  value={department.manager || ''}
                  onChange={(e) => handleDepartmentChange(index, 'manager', e.target.value)}
                />
              </div>
              
              <div className="settings-section__field">
                <label htmlFor={`dept-desc-${index}`}>Description</label>
                <textarea
                  id={`dept-desc-${index}`}
                  className="settings-input"
                  value={department.description || ''}
                  onChange={(e) => handleDepartmentChange(index, 'description', e.target.value)}
                  rows={2}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          className="btn-secondary px-4 py-2 text-sm mt-2"
          onClick={handleDepartmentAdd}
        >
          Add Department
        </button>
      </div>

      {/* Group Management */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Group Management</h3>
        
        {formData.groups?.map((group, index) => (
          <div key={group.id} className="mb-4 p-4 bg-background border rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Group {index + 1}</h4>
              <button
                type="button"
                className="text-destructive hover:text-destructive/80"
                onClick={() => handleGroupRemove(index)}
              >
                Remove
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="settings-section__field">
                <label htmlFor={`group-name-${index}`}>Group Name</label>
                <input
                  id={`group-name-${index}`}
                  type="text"
                  className="settings-input"
                  value={group.name || ''}
                  onChange={(e) => handleGroupChange(index, 'name', e.target.value)}
                />
              </div>
              
              <div className="settings-section__field">
                <label htmlFor={`group-desc-${index}`}>Description</label>
                <textarea
                  id={`group-desc-${index}`}
                  className="settings-input"
                  value={group.description || ''}
                  onChange={(e) => handleGroupChange(index, 'description', e.target.value)}
                  rows={2}
                ></textarea>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          className="btn-secondary px-4 py-2 text-sm mt-2"
          onClick={handleGroupAdd}
        >
          Add Group
        </button>
      </div>

      {/* Form submission */}
      <div className="button-group">
        <button
          type="submit"
          className="btn-primary px-4 py-2"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Admin Settings'}
        </button>
        
        <button
          type="button"
          className="btn-secondary px-4 py-2"
          onClick={() => setFormData(adminSettings || {})}
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
          Admin settings saved successfully.
        </div>
      )}
    </form>
  );
};

export default AdminSettings;
