import React, { useRef } from 'react';
import profilePic from '../../../assets/speaker.jpeg';

const ProfileCard = () => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (el) el.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.15s ease-out',
      }}
    >
      <img
        src={profilePic}
        alt="Janio Martinez Bachmann"
        style={{
          width: '140px',
          height: '140px',
          objectFit: 'cover',
          borderRadius: 'var(--radius-lg)',
          border: '3px solid var(--color-border-accent)',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
        }}
      />
      <div style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>
          Janio Martinez Bachmann
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
          id: 1 of 1
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
