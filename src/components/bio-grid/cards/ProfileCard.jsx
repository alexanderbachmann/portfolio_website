import React from 'react';
import CartoonJanio from '@/components/hero/CartoonJanio';
import useTilt from '@/components/shared/useTilt';
import { site } from '@/data/site';

/* The illustrated avatar lives here now; the hero shows the real photo. */
const ProfileCard = () => {
  const tilt = useTilt(8, 600);

  return (
    <div
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className="bio-profile"
    >
      <div className="bio-profile-figure">
        <CartoonJanio />
      </div>
      <div className="bio-profile-caption">
        <div className="bio-profile-name">{site.name}</div>
        <div className="bio-profile-id">id: 1 of 1</div>
      </div>
    </div>
  );
};

export default ProfileCard;
