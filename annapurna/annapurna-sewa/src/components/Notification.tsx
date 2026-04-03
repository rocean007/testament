import React from 'react';

interface Props {
  message: string;
  visible: boolean;
}

export const Notification: React.FC<Props> = ({ message, visible }) => (
  <div
    role="alert"
    aria-live="polite"
    aria-hidden={!visible}
    style={{
      position: 'fixed', top: 30, right: 30,
      background: 'linear-gradient(135deg, #10B981, #059669)',
      color: 'white', padding: '1.2rem 2rem',
      borderRadius: 16, boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
      display: visible ? 'flex' : 'none',
      alignItems: 'center', gap: 12, zIndex: 1001,
      minWidth: 300, borderLeft: '5px solid #F59E0B',
      animation: 'slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
    }}
  >
    <i className="fas fa-check-circle" />
    <span>{message}</span>
  </div>
);
