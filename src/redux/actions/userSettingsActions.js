
import { protectedAxiosInstance } from 'helpers/api-calls';
import * as types from '../constants/userSettingsConstants';

// Mock API calls (replace with actual endpoints)
const API = {
  getTeamMember: (employeeId) => 
    protectedAxiosInstance.get(`api/customer/admin_role/user_privileges/${employeeId}`),
  
  updateUserProfile: (userId, data) => 
    protectedAxiosInstance.put(`api/customer/user_role/users/${userId}`, { user: data }),
  
  updateUserJobSettings: (userId, data) => 
    protectedAxiosInstance.put(`api/customer/admin_role/job_settings/${userId}`, data),
  
  updateUserAvailability: (userId, data) => 
    protectedAxiosInstance.put(`api/customer/user_role/availability/${userId}`, data),
  
  updateUserNotifications: (userId, data) => 
    protectedAxiosInstance.put(`api/customer/user_role/notifications/${userId}`, data),
  
  updateUserSecurity: (userId, data) => 
    protectedAxiosInstance.put(`api/customer/user_role/security/${userId}`, data),
  
  updateAdminSettings: (userId, data) => 
    protectedAxiosInstance.put(`api/customer/admin_role/admin_settings/${userId}`, data),
  
  updateOptionalSettings: (userId, data) => 
    protectedAxiosInstance.put(`api/customer/user_role/optional_settings/${userId}`, data),
};

// Fetch user settings
export const fetchUserSettings = (employeeId) => async (dispatch) => {
  dispatch({ type: types.FETCH_USER_SETTINGS_REQUEST });
  
  try {
    const response = await API.getTeamMember(employeeId);
    
    dispatch({
      type: types.FETCH_USER_SETTINGS_SUCCESS,
      payload: response.data,
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.FETCH_USER_SETTINGS_FAILURE,
      payload: error.message || 'Failed to fetch user settings',
    });
    
    return null;
  }
};

// Update user profile
export const updateUserProfile = (userId, profileData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_PROFILE_REQUEST });
  
  try {
    const response = await API.updateUserProfile(userId, profileData);
    
    dispatch({
      type: types.UPDATE_USER_PROFILE_SUCCESS,
      payload: profileData,
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_PROFILE_FAILURE,
      payload: error.message || 'Failed to update profile',
    });
    
    return null;
  }
};

// Update job settings
export const updateJobSettings = (userId, jobData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_JOB_REQUEST });
  
  try {
    const response = await API.updateUserJobSettings(userId, jobData);
    
    dispatch({
      type: types.UPDATE_USER_JOB_SUCCESS,
      payload: jobData,
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_JOB_FAILURE,
      payload: error.message || 'Failed to update job settings',
    });
    
    return null;
  }
};

// Update availability settings
export const updateAvailabilitySettings = (userId, availabilityData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_AVAILABILITY_REQUEST });
  
  try {
    const response = await API.updateUserAvailability(userId, availabilityData);
    
    dispatch({
      type: types.UPDATE_USER_AVAILABILITY_SUCCESS,
      payload: availabilityData,
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_AVAILABILITY_FAILURE,
      payload: error.message || 'Failed to update availability settings',
    });
    
    return null;
  }
};

// Update notification settings
export const updateNotificationSettings = (userId, notificationData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_NOTIFICATIONS_REQUEST });
  
  try {
    const response = await API.updateUserNotifications(userId, notificationData);
    
    dispatch({
      type: types.UPDATE_USER_NOTIFICATIONS_SUCCESS,
      payload: notificationData,
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_NOTIFICATIONS_FAILURE,
      payload: error.message || 'Failed to update notification settings',
    });
    
    return null;
  }
};

// Update security settings
export const updateSecuritySettings = (userId, securityData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_SECURITY_REQUEST });
  
  try {
    const response = await API.updateUserSecurity(userId, securityData);
    
    dispatch({
      type: types.UPDATE_USER_SECURITY_SUCCESS,
      payload: securityData,
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_SECURITY_FAILURE,
      payload: error.message || 'Failed to update security settings',
    });
    
    return null;
  }
};

// Update admin settings (admin only)
export const updateAdminSettings = (userId, adminData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_ADMIN_SETTINGS_REQUEST });
  
  try {
    const response = await API.updateAdminSettings(userId, adminData);
    
    dispatch({
      type: types.UPDATE_USER_ADMIN_SETTINGS_SUCCESS,
      payload: adminData,
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_ADMIN_SETTINGS_FAILURE,
      payload: error.message || 'Failed to update admin settings',
    });
    
    return null;
  }
};

// Update optional settings
export const updateOptionalSettings = (userId, optionalData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_USER_OPTIONAL_SETTINGS_REQUEST });
  
  try {
    const response = await API.updateOptionalSettings(userId, optionalData);
    
    dispatch({
      type: types.UPDATE_USER_OPTIONAL_SETTINGS_SUCCESS,
      payload: optionalData,
    });
    
    return response.data;
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_OPTIONAL_SETTINGS_FAILURE,
      payload: error.message || 'Failed to update optional settings',
    });
    
    return null;
  }
};
