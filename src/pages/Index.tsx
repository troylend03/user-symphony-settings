import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  BellIcon,
  ShieldIcon,
  CogIcon,
  TagIcon
} from 'lucide-react';

// Import components
import SettingsHeader from '../components/SettingsHeader';
import SettingsSection from '../components/SettingsSection';
import ProfileSettings from '../components/ProfileSettings';
import JobSettings from '../components/JobSettings';
import AvailabilitySettings from '../components/AvailabilitySettings';
import NotificationSettings from '../components/NotificationSettings';
import SecuritySettings from '../components/SecuritySettings';
import AdminSettings from '../components/AdminSettings';
import OptionalSettings from '../components/OptionalSettings';

// Import actions
import {
  fetchUserSettings,
  updateUserProfile,
  updateJobSettings,
  updateAvailabilitySettings,
  updateNotificationSettings,
  updateSecuritySettings,
  updateAdminSettings,
  updateOptionalSettings
} from '../redux/actions/userSettingsActions';

// TODO: Replace this with actual data from Redux
// This is just for development/preview purposes
const mockUserData = {
  userId: '12345',
  firstName: 'John',
  lastName: 'Doe',
  preferredName: 'Johnny',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  jobTitle: 'Senior Designer',
  employeeId: 'EMP-1234',
  profileImage: null,
  role: 'admin', // 'admin' or 'team_member'
};

const UserSettingsPage = ({ 
  // Props from Redux
  fetchUserSettings,
  updateUserProfile,
  updateJobSettings,
  updateAvailabilitySettings,
  updateNotificationSettings,
  updateSecuritySettings,
  updateAdminSettings,
  updateOptionalSettings,
  userSettings,
  loading,
  error,
  updateStatus,
  currentUserId,
  userRole
}) => {
  // Use mock data for now, replace with Redux data in real implementation
  const [userData, setUserData] = useState(mockUserData);
  
  // Setting active sections (for animations when first loading)
  const [activeSections, setActiveSections] = useState({
    profile: false,
    job: false,
    availability: false,
    notifications: false,
    security: false,
    admin: false,
    optional: false
  });

  // Set a timeout to animate each section in sequence
  useEffect(() => {
    let timeout = 100;
    
    Object.keys(activeSections).forEach(section => {
      setTimeout(() => {
        setActiveSections(prev => ({
          ...prev,
          [section]: true
        }));
      }, timeout);
      timeout += 100;
    });
  }, []);

  // Fetch user settings on component mount
  useEffect(() => {
    if (currentUserId) {
      fetchUserSettings(currentUserId);
    }
  }, [currentUserId, fetchUserSettings]);

  // Update local state when Redux data changes
  useEffect(() => {
    if (userSettings?.data) {
      // In a real implementation, you would map fields from Redux to component state
      // setUserData(userSettings.data);
    }
  }, [userSettings]);

  // Determine if user is admin
  const isAdmin = userData.role === 'admin';

  // Handle profile update
  const handleUpdateProfile = (profileData) => {
    updateUserProfile(userData.userId, profileData);
  };

  // Handle job settings update
  const handleUpdateJobSettings = (jobData) => {
    updateJobSettings(userData.userId, jobData);
  };

  // Handle availability update
  const handleUpdateAvailability = (availabilityData) => {
    updateAvailabilitySettings(userData.userId, availabilityData);
  };

  // Handle notifications update
  const handleUpdateNotifications = (notificationData) => {
    updateNotificationSettings(userData.userId, notificationData);
  };

  // Handle security update
  const handleUpdateSecurity = (securityData) => {
    updateSecuritySettings(userData.userId, securityData);
  };

  // Handle admin settings update
  const handleUpdateAdminSettings = (adminData) => {
    updateAdminSettings(userData.userId, adminData);
  };

  // Handle optional settings update
  const handleUpdateOptionalSettings = (optionalData) => {
    updateOptionalSettings(userData.userId, optionalData);
  };

  return (
    <div className="settings-container bg-background min-h-screen pb-20">
      <SettingsHeader user={userData} />
      
      <div className="grid grid-cols-1 gap-4">
        {/* Profile & Personal Information */}
        <div className={`transition-all duration-300 ease-out ${activeSections.profile ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <SettingsSection 
            title="Profile & Personal Information" 
            isExpanded={true} 
            icon={<UserIcon size={18} />}
          >
            <ProfileSettings 
              profile={userSettings?.data?.profile}
              isAdmin={isAdmin}
              updateProfile={handleUpdateProfile}
              isLoading={updateStatus?.profile?.loading}
              errorMessage={updateStatus?.profile?.error}
              successStatus={updateStatus?.profile?.success}
            />
          </SettingsSection>
        </div>
        
        {/* Job-Related Settings */}
        <div className={`transition-all duration-300 ease-out ${activeSections.job ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <SettingsSection 
            title="Job-Related Settings" 
            icon={<BriefcaseIcon size={18} />}
          >
            <JobSettings 
              jobSettings={userSettings?.data?.jobSettings}
              isAdmin={isAdmin}
              updateJobSettings={handleUpdateJobSettings}
              isLoading={updateStatus?.jobSettings?.loading}
              errorMessage={updateStatus?.jobSettings?.error}
              successStatus={updateStatus?.jobSettings?.success}
            />
          </SettingsSection>
        </div>
        
        {/* Availability & Scheduling */}
        <div className={`transition-all duration-300 ease-out ${activeSections.availability ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <SettingsSection 
            title="Availability & Scheduling" 
            icon={<CalendarIcon size={18} />}
          >
            <AvailabilitySettings 
              availability={userSettings?.data?.availability}
              isAdmin={isAdmin}
              updateAvailability={handleUpdateAvailability}
              isLoading={updateStatus?.availability?.loading}
              errorMessage={updateStatus?.availability?.error}
              successStatus={updateStatus?.availability?.success}
            />
          </SettingsSection>
        </div>
        
        {/* Notifications & Communication */}
        <div className={`transition-all duration-300 ease-out ${activeSections.notifications ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <SettingsSection 
            title="Notifications & Communication" 
            icon={<BellIcon size={18} />}
          >
            <NotificationSettings 
              notifications={userSettings?.data?.notifications}
              updateNotifications={handleUpdateNotifications}
              isLoading={updateStatus?.notifications?.loading}
              errorMessage={updateStatus?.notifications?.error}
              successStatus={updateStatus?.notifications?.success}
            />
          </SettingsSection>
        </div>
        
        {/* Security & Account Management */}
        <div className={`transition-all duration-300 ease-out ${activeSections.security ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <SettingsSection 
            title="Security & Account Management" 
            icon={<ShieldIcon size={18} />}
          >
            <SecuritySettings 
              security={userSettings?.data?.security}
              updateSecurity={handleUpdateSecurity}
              isLoading={updateStatus?.security?.loading}
              errorMessage={updateStatus?.security?.error}
              successStatus={updateStatus?.security?.success}
            />
          </SettingsSection>
        </div>
        
        {/* Admin-Specific Settings (Only visible to admins) */}
        {isAdmin && (
          <div className={`transition-all duration-300 ease-out ${activeSections.admin ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <SettingsSection 
              title="Admin Settings" 
              icon={<CogIcon size={18} />}
              badge="Admin Only"
            >
              <AdminSettings 
                adminSettings={userSettings?.data?.adminSettings}
                updateAdminSettings={handleUpdateAdminSettings}
                isLoading={updateStatus?.adminSettings?.loading}
                errorMessage={updateStatus?.adminSettings?.error}
                successStatus={updateStatus?.adminSettings?.success}
              />
            </SettingsSection>
          </div>
        )}
        
        {/* Other Optional Settings */}
        <div className={`transition-all duration-300 ease-out ${activeSections.optional ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <SettingsSection 
            title="Other Optional Settings" 
            icon={<TagIcon size={18} />}
          >
            <OptionalSettings 
              optionalSettings={userSettings?.data?.optionalSettings}
              updateOptionalSettings={handleUpdateOptionalSettings}
              isLoading={updateStatus?.optionalSettings?.loading}
              errorMessage={updateStatus?.optionalSettings?.error}
              successStatus={updateStatus?.optionalSettings?.success}
            />
          </SettingsSection>
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2 border-b-2 border-transparent"></div>
        </div>
      )}
      
      {/* Global error */}
      {error && (
        <div className="fixed bottom-4 right-4 p-4 bg-destructive text-destructive-foreground rounded-md shadow-lg z-50">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

// Map Redux state to props
const mapStateToProps = (state) => ({
  userSettings: state.userSettings,
  loading: state.userSettings.loading,
  error: state.userSettings.error,
  updateStatus: state.userSettings.updateStatus,
  currentUserId: mockUserData.userId, // Replace with state.auth.userId in real implementation
  userRole: mockUserData.role, // Replace with state.auth.role in real implementation
});

const mapDispatchToProps = {
  fetchUserSettings,
  updateUserProfile,
  updateJobSettings,
  updateAvailabilitySettings,
  updateNotificationSettings,
  updateSecuritySettings,
  updateAdminSettings,
  updateOptionalSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsPage);
