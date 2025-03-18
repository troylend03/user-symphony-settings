
import React, { useState } from 'react';
import '../styles/settings.scss';

const SettingsSection = ({ 
  title, 
  children, 
  isExpanded = false,
  icon,
  badge = null,
}) => {
  const [expanded, setExpanded] = useState(isExpanded);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`settings-section glass-morphism animate-slide-in ${expanded ? 'mb-6' : 'mb-4'}`}>
      <div 
        className="settings-section__header" 
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          {icon && (
            <span className="mr-2 text-muted-foreground">
              {icon}
            </span>
          )}
          <h2>{title}</h2>
          {badge && (
            <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <button 
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label={expanded ? "Collapse section" : "Expand section"}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
          >
            <path 
              d="M6 9l6 6 6-6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      
      {expanded && (
        <div className="settings-section__content settings-animation-container">
          {children}
        </div>
      )}
    </div>
  );
};

export default SettingsSection;
