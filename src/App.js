import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [dogInfo, setDogInfo] = useState(null);

  const handleSearch = async () => {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/dogs?name=${name}`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': 'XjOudETrqZjFYoqOhUAR3g==pTqOyXMNrDdWgey1',
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const resultArray = await response.json();

    // Check if the resultArray has at least one element before accessing its properties
    if (resultArray.length > 0) {
      const result = resultArray[0]; // Get the first element
      setDogInfo(result);
    } else {
      // Handle the case when no dog information is found
      setDogInfo(null);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className="App">
      <h1>Search for a Dog</h1>
      <input
        type="text"
        placeholder="Enter dog name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {dogInfo && (
        <div>
          <h2>Dog Information</h2>
          <p> Name of Dog breed: {dogInfo.name}</p>
        
          <p> Good with strangers: {dogInfo.good_with_strangers}/5</p>
          <p> Playfulness: {dogInfo.playfulness}/5</p>
          <p> Min life expectancy {dogInfo.min_life_expectancy}/20</p>

    
          <p><img src={dogInfo.image_link} alt={dogInfo.name} /></p>
          {/* Add more information fields as needed */}
        </div>
      )}
    </div>
  );
}

export default App;


