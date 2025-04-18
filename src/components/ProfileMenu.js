import React from 'react';

const ProfileMenu = () => {
  return (
    <div className="profile-menu">
      <button onClick={() => alert('Settings')}>Settings</button>
      <button onClick={() => alert('Upgrade Plan')}>Upgrade Plan</button>
      <button onClick={() => alert('Logout')}>Logout</button>
    </div>
  );
};

export default ProfileMenu;
