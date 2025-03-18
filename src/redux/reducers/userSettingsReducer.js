
import * as types from '../constants/userSettingsConstants';

const initialState = {
  loading: false,
  error: null,
  data: {
    profile: {},
    jobSettings: {},
    availability: {},
    notifications: {},
    security: {},
    adminSettings: {},
    optionalSettings: {},
  },
  updateStatus: {
    profile: { loading: false, error: null, success: false },
    jobSettings: { loading: false, error: null, success: false },
    availability: { loading: false, error: null, success: false },
    notifications: { loading: false, error: null, success: false },
    security: { loading: false, error: null, success: false },
    adminSettings: { loading: false, error: null, success: false },
    optionalSettings: { loading: false, error: null, success: false },
  }
};

export const userSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all settings
    case types.FETCH_USER_SETTINGS_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };
      
    case types.FETCH_USER_SETTINGS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        data: action.payload 
      };
      
    case types.FETCH_USER_SETTINGS_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    
    // Profile updates
    case types.UPDATE_USER_PROFILE_REQUEST:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          profile: { loading: true, error: null, success: false } 
        } 
      };
      
    case types.UPDATE_USER_PROFILE_SUCCESS:
      return { 
        ...state, 
        data: { 
          ...state.data, 
          profile: { ...state.data.profile, ...action.payload } 
        },
        updateStatus: { 
          ...state.updateStatus, 
          profile: { loading: false, error: null, success: true } 
        } 
      };
      
    case types.UPDATE_USER_PROFILE_FAILURE:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          profile: { loading: false, error: action.payload, success: false } 
        } 
      };
    
    // Job settings updates
    case types.UPDATE_USER_JOB_REQUEST:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          jobSettings: { loading: true, error: null, success: false } 
        } 
      };
      
    case types.UPDATE_USER_JOB_SUCCESS:
      return { 
        ...state, 
        data: { 
          ...state.data, 
          jobSettings: { ...state.data.jobSettings, ...action.payload } 
        },
        updateStatus: { 
          ...state.updateStatus, 
          jobSettings: { loading: false, error: null, success: true } 
        } 
      };
      
    case types.UPDATE_USER_JOB_FAILURE:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          jobSettings: { loading: false, error: action.payload, success: false } 
        } 
      };
    
    // Availability updates
    case types.UPDATE_USER_AVAILABILITY_REQUEST:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          availability: { loading: true, error: null, success: false } 
        } 
      };
      
    case types.UPDATE_USER_AVAILABILITY_SUCCESS:
      return { 
        ...state, 
        data: { 
          ...state.data, 
          availability: { ...state.data.availability, ...action.payload } 
        },
        updateStatus: { 
          ...state.updateStatus, 
          availability: { loading: false, error: null, success: true } 
        } 
      };
      
    case types.UPDATE_USER_AVAILABILITY_FAILURE:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          availability: { loading: false, error: action.payload, success: false } 
        } 
      };
    
    // Notification updates
    case types.UPDATE_USER_NOTIFICATIONS_REQUEST:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          notifications: { loading: true, error: null, success: false } 
        } 
      };
      
    case types.UPDATE_USER_NOTIFICATIONS_SUCCESS:
      return { 
        ...state, 
        data: { 
          ...state.data, 
          notifications: { ...state.data.notifications, ...action.payload } 
        },
        updateStatus: { 
          ...state.updateStatus, 
          notifications: { loading: false, error: null, success: true } 
        } 
      };
      
    case types.UPDATE_USER_NOTIFICATIONS_FAILURE:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          notifications: { loading: false, error: action.payload, success: false } 
        } 
      };
    
    // Security updates
    case types.UPDATE_USER_SECURITY_REQUEST:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          security: { loading: true, error: null, success: false } 
        } 
      };
      
    case types.UPDATE_USER_SECURITY_SUCCESS:
      return { 
        ...state, 
        data: { 
          ...state.data, 
          security: { ...state.data.security, ...action.payload } 
        },
        updateStatus: { 
          ...state.updateStatus, 
          security: { loading: false, error: null, success: true } 
        } 
      };
      
    case types.UPDATE_USER_SECURITY_FAILURE:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          security: { loading: false, error: action.payload, success: false } 
        } 
      };
    
    // Admin settings updates
    case types.UPDATE_USER_ADMIN_SETTINGS_REQUEST:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          adminSettings: { loading: true, error: null, success: false } 
        } 
      };
      
    case types.UPDATE_USER_ADMIN_SETTINGS_SUCCESS:
      return { 
        ...state, 
        data: { 
          ...state.data, 
          adminSettings: { ...state.data.adminSettings, ...action.payload } 
        },
        updateStatus: { 
          ...state.updateStatus, 
          adminSettings: { loading: false, error: null, success: true } 
        } 
      };
      
    case types.UPDATE_USER_ADMIN_SETTINGS_FAILURE:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          adminSettings: { loading: false, error: action.payload, success: false } 
        } 
      };
    
    // Optional settings updates
    case types.UPDATE_USER_OPTIONAL_SETTINGS_REQUEST:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          optionalSettings: { loading: true, error: null, success: false } 
        } 
      };
      
    case types.UPDATE_USER_OPTIONAL_SETTINGS_SUCCESS:
      return { 
        ...state, 
        data: { 
          ...state.data, 
          optionalSettings: { ...state.data.optionalSettings, ...action.payload } 
        },
        updateStatus: { 
          ...state.updateStatus, 
          optionalSettings: { loading: false, error: null, success: true } 
        } 
      };
      
    case types.UPDATE_USER_OPTIONAL_SETTINGS_FAILURE:
      return { 
        ...state, 
        updateStatus: { 
          ...state.updateStatus, 
          optionalSettings: { loading: false, error: action.payload, success: false } 
        } 
      };
    
    default:
      return state;
  }
};
