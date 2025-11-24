// MailIcon.jsx
import React from 'react';

const MailIcon = ({ className = '', style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" />
    <polyline points="2,4 12,13 22,4" fill="none" stroke="#fff" strokeWidth="2" />
    <polyline points="2,20 12,11 22,20" fill="none" stroke="#fff" strokeWidth="2" />
  </svg>
);

export default MailIcon;
