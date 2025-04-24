import React, { useState, useEffect } from 'react';

const randomNames = ['John', 'Alice', 'Bob', 'Charlie', 'Sarah', 'Eve'];
const randomMods = ['Mod A', 'Mod B', 'Mod C', 'Mod D'];

const generateRandomAlert = () => {
  const name = randomNames[Math.floor(Math.random() * randomNames.length)];
  const mod = randomMods[Math.floor(Math.random() * randomMods.length)];
  const timeAgo = Math.floor(Math.random() * (60 - 1 + 1)) + 1; // Random time between 1 and 60 minutes
  return {
    message: `${name} purchased ${mod}`,
    timeAgo: `${timeAgo} minute${timeAgo > 1 ? 's' : ''} ago`
  };
};

export default function FakeAlert() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomAlert = generateRandomAlert();
      setAlert(randomAlert);

      // Hide the alert after 2 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000); // 2 seconds

    }, Math.floor(Math.random() * (60000 - 10000 + 1)) + 50000); // Random interval between 10s and 60s

    // Cleanup the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const mainDivStyle = {
    position: 'fixed',
    bottom: '15px',
    left: '15px',
    width: '380px',
    height: '110px',
    background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
    border: '2px solid #00ff99',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    boxShadow: '0 0 15px #00ff99',
    zIndex: '1000',
    fontFamily: 'Orbitron, sans-serif',
    color: '#fff',
    opacity: '0.95',
    animation: 'popFadeIn 0.3s ease-out'
  };

  const imgStyle = {
    width: '100px',
    height: '80px',
    borderRadius: '8px',
    marginRight: '12px',
    objectFit: 'cover',
    boxShadow: '0 0 8px #00ffcc'
  };

  return (
    <div>
      {alert && (
        <div style={mainDivStyle}>
          <img
            src="https://via.placeholder.com/100x80" // Use a placeholder image or an actual image for the mod
            alt="Item Image"
            style={imgStyle}
          />
          <div style={{ flexGrow: 1 }}>
            <strong style={{ fontSize: '1em', color: '#00ffcc' }}>
              {alert.message}
            </strong>
            <br />
            <span style={{ fontSize: '0.9em' }}>
              Purchased <span style={{ color: '#00ff99' }}>{alert.timeAgo}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
