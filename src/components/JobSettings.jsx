
import React, { useState, useEffect } from 'react';
import '../styles/settings.scss';

const JobSettings = ({ 
  jobSettings, 
  isAdmin, 
  updateJobSettings, 
  isLoading,
  errorMessage,
  successStatus 
}) => {
  const [formData, setFormData] = useState({
    role: '',
    permissions: [],
    departments: [],
    groups: [],
    skills: [],
    payRate: '',
    payType: 'hourly',
    certifications: []
  });

  useEffect(() => {
    if (jobSettings) {
      setFormData({
        ...formData,
        ...jobSettings
      });
    }
  }, [jobSettings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, value]
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(permission => permission !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJobSettings(formData);
  };

  // Sample permission options
  const permissionOptions = [
    { value: 'view_schedule', label: 'View Schedule' },
    { value: 'edit_own_schedule', label: 'Edit Own Schedule' },
    { value: 'edit_team_schedule', label: 'Edit Team Schedule' },
    { value: 'approve_time_off', label: 'Approve Time Off' },
    { value: 'view_reports', label: 'View Reports' },
    { value: 'manage_users', label: 'Manage Users' }
  ];

  // Sample departments
  const departmentOptions = [
    { value: 'operations', label: 'Operations' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'customer_service', label: 'Customer Service' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  // Sample skill options
  const skillOptions = [
    { value: 'customer_service', label: 'Customer Service' },
    { value: 'sales', label: 'Sales' },
    { value: 'tech_support', label: 'Technical Support' },
    { value: 'inventory', label: 'Inventory Management' },
    { value: 'cash_handling', label: 'Cash Handling' },
    { value: 'training', label: 'Training' },
    { value: 'leadership', label: 'Leadership' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Role & Permissions */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Role & Permissions</h3>
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="role">
              Role
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <select
              id="role"
              name="role"
              className={`settings-input ${!isAdmin ? 'read-only' : ''}`}
              value={formData.role || ''}
              onChange={handleInputChange}
              disabled={!isAdmin}
            >
              <option value="">Select role...</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="supervisor">Supervisor</option>
              <option value="team_member">Team Member</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2">
            Permissions
            {!isAdmin && <span className="read-only-badge">Read-only</span>}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {permissionOptions.map(permission => (
              <div key={permission.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`permission-${permission.value}`}
                  name="permissions"
                  value={permission.value}
                  checked={formData.permissions?.includes(permission.value)}
                  onChange={handlePermissionChange}
                  disabled={!isAdmin}
                  className={`mr-2 ${!isAdmin ? 'opacity-60' : ''}`}
                />
                <label 
                  htmlFor={`permission-${permission.value}`}
                  className={`text-sm ${!isAdmin ? 'opacity-60' : ''}`}
                >
                  {permission.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department & Group Membership */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Department & Group Membership</h3>
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="departments">
              Departments
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <select
              id="departments"
              name="departments"
              multiple
              className={`settings-input h-32 ${!isAdmin ? 'read-only' : ''}`}
              value={formData.departments || []}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({
                  ...formData,
                  departments: values
                });
              }}
              disabled={!isAdmin}
            >
              {departmentOptions.map(dept => (
                <option key={dept.value} value={dept.value}>{dept.label}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Hold Ctrl/Cmd to select multiple departments
            </p>
          </div>

          <div className="settings-section__field">
            <label htmlFor="groups">
              Groups
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <input
              id="groups"
              name="groups"
              type="text"
              className={`settings-input ${!isAdmin ? 'read-only' : ''}`}
              value={formData.groups?.join(', ') || ''}
              onChange={(e) => {
                const groupsArray = e.target.value.split(',').map(g => g.trim()).filter(Boolean);
                setFormData({
                  ...formData,
                  groups: groupsArray
                });
              }}
              placeholder="Enter groups separated by commas"
              readOnly={!isAdmin}
            />
          </div>
        </div>
      </div>

      {/* Skills & Certifications */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Skills & Certifications</h3>
        <div className="settings-section__grid">
          <div className="settings-section__field">
            <label htmlFor="skills">
              Skills
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <select
              id="skills"
              name="skills"
              multiple
              className={`settings-input h-32 ${!isAdmin ? 'read-only' : ''}`}
              value={formData.skills || []}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setFormData({
                  ...formData,
                  skills: values
                });
              }}
              disabled={!isAdmin}
            >
              {skillOptions.map(skill => (
                <option key={skill.value} value={skill.value}>{skill.label}</option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Hold Ctrl/Cmd to select multiple skills
            </p>
          </div>

          <div className="settings-section__field">
            <label htmlFor="certifications">
              Certifications
              {!isAdmin && <span className="read-only-badge">Read-only</span>}
            </label>
            <textarea
              id="certifications"
              name="certifications"
              className={`settings-input h-32 ${!isAdmin ? 'read-only' : ''}`}
              value={formData.certifications?.join('\n') || ''}
              onChange={(e) => {
                const certsArray = e.target.value.split('\n').map(c => c.trim()).filter(Boolean);
                setFormData({
                  ...formData,
                  certifications: certsArray
                });
              }}
              placeholder="Enter certifications, one per line"
              readOnly={!isAdmin}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Pay & Wage Details (Admin only) */}
      {isAdmin && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Pay & Wage Details</h3>
          <div className="settings-section__grid">
            <div className="settings-section__field">
              <label htmlFor="payType">Pay Type</label>
              <select
                id="payType"
                name="payType"
                className="settings-input"
                value={formData.payType || 'hourly'}
                onChange={handleInputChange}
              >
                <option value="hourly">Hourly</option>
                <option value="salary">Salary</option>
                <option value="commission">Commission</option>
              </select>
            </div>

            <div className="settings-section__field">
              <label htmlFor="payRate">Pay Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                <input
                  id="payRate"
                  name="payRate"
                  type="text"
                  className="settings-input pl-7"
                  value={formData.payRate || ''}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form submission */}
      {isAdmin && (
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
            onClick={() => setFormData(jobSettings || {})}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Success message */}
      {successStatus && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
          Job settings saved successfully.
        </div>
      )}
    </form>
  );
};

export default JobSettings;
