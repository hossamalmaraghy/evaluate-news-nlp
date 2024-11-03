// Import the nameChecker function
import { checkForName } from './nameChecker';

export const handleSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;

    // Validate the name input
    if (!checkForName(name)) {
        return; // Stop submission if validation fails
    }

    try {
        const response = await fetch(`https://api.example.com/analyze?text=${name}`);
        const data = await response.json();

        document.getElementById('results').innerHTML = `
            Polarity: ${data.polarity} <br>
            Confidence: ${data.confidence} <br>
            Subjectivity: ${data.subjectivity}
        `;
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('results').innerHTML = "An error occurred. Please try again.";
    }
};

// Only add the event listener if the element exists
if (typeof document !== 'undefined') {
    const form = document.getElementById('urlForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}
