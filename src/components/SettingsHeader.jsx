
import React from 'react';
import '../styles/settings.scss';

const SettingsHeader = ({ user }) => {
  return (
    <div className="settings-header animate-fade-in">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">User Settings</h1>
      <p className="text-muted-foreground">
        Manage your profile, job settings, scheduling, notifications, and more.
      </p>
      {user && (
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden mr-3">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={`${user.firstName} ${user.lastName}`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-medium">
                {user.firstName?.charAt(0) || ''}{user.lastName?.charAt(0) || ''}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-medium">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">
              {user.jobTitle || 'Team Member'} · {user.employeeId || 'ID Pending'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsHeader;
