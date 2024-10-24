// src/client/js/formHandler.js

const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formText = document.getElementById('name').value;
  
    try {
      const response = await fetch('http://localhost:8000/api', {
        method: 'POST',
        body: JSON.stringify({ text: formText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      
      // Dynamically update content on the page
      document.getElementById('results').innerHTML = `
        <p>Polarity: ${data.polarity}</p>
        <p>Confidence: ${data.confidence}</p>
        <p>Subjectivity: ${data.subjectivity}</p>
      `;
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('results').innerHTML = 'Error fetching data. Please try again.';
    }
  };
  
  export { handleSubmit };
