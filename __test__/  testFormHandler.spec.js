// Import the function to test
import { handleSubmit } from '../src/client/js/formHandler';

// Mocking the fetch function globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      polarity: 'positive',
      confidence: '90%',
      subjectivity: 'subjective',
    }),
  })
);

// Mock the DOM element
beforeEach(() => {
  // Create the mock form and append it to the document body
  document.body.innerHTML = `
    <form id="urlForm">
      <input id="name" value="test input">
      <button type="submit">Submit</button>
    </form>
    <div id="results"></div> <!-- Add this missing div -->
  `;
});

describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function to be defined", () => {
    expect(handleSubmit).toBeDefined();
  });

  test("Testing handleSubmit() for form submission", async () => {
    // Mock the event
    const event = { preventDefault: jest.fn() };

    // Get the form element and add an event listener
    const form = document.getElementById('urlForm');
    form.addEventListener('submit', handleSubmit);

    // Trigger the handleSubmit function
    await handleSubmit(event);

    // Check if the preventDefault method was called
    expect(event.preventDefault).toHaveBeenCalled();

    // Check if the 'results' element gets updated
    const results = document.getElementById('results');
    expect(results.innerHTML).toContain("Polarity: positive");
    expect(results.innerHTML).toContain("Confidence: 90%");
    expect(results.innerHTML).toContain("Subjectivity: subjective");
  });
});
