'use client'

import React, { useState } from 'react';

export async function fetchSomethingFromExternalApi(serverIdToken: string) {
  return fetch("http://localhost:4000/api/example", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${serverIdToken}`,
    },
  });
}

const Testing: React.FC = () => {
  const [buttonColor, setButtonColor] = useState<'red' | 'green' | 'default'>('default');

  const handleApiCall = async () => {
    try {
      console.log("phase 1")
      const tokenResponse = await fetch('/api/get-token');
      const tokenData = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenData.token) {
        setButtonColor('red');
        console.error('Error fetching token:', tokenData);
        return;
      }

      const response = await fetchSomethingFromExternalApi(tokenData.token);

      if (response.ok) {
        setButtonColor('green'); // API call successful
        const data = await response.json();
        console.log('API Response:', data);
      } else {
        setButtonColor('red'); // API call failed
        console.error('API Error:', response.statusText);
      }
    } catch (error) {
      setButtonColor('red'); // Network or other error
      console.error('Error fetching data:', error);
    }
  };

  const buttonStyle = {
    backgroundColor: buttonColor === 'default' ? '#ccc' : buttonColor,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleApiCall}>
        Test API Call
      </button>
    </div>
  );
};

export default Testing;
