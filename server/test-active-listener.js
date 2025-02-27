// Import required packages
import axios from 'axios';

// Test function to run the Active Listener API
async function testActiveListener() {
  try {
    console.log('Testing Active Listener API endpoint...');
    
    // Sample message to send
    const testMessage = "I've been feeling stressed about work lately. My boss keeps setting unrealistic deadlines, and I'm struggling to maintain a good work-life balance.";
    
    console.log(`Sending message: "${testMessage}"`);
    
    // Sample conversation history (optional)
    const history = [
      {
        text: "Hi there, I'd like to talk about some things that have been on my mind.",
        isUser: true,
        timestamp: new Date(Date.now() - 120000)
      },
      {
        text: "I understand you want to share what's been on your mind. I'm here to listen. What would you like to talk about?",
        isUser: false,
        timestamp: new Date(Date.now() - 90000)
      }
    ];
    
    // Make the POST request to the active listener endpoint
    const response = await axios.post('http://localhost:3001/api/active-listener', {
      message: testMessage,
      history: history
    });
    
    // Log the response
    console.log('\nAPI Response:');
    console.log('===================');
    console.log('Success:', response.data.success);
    console.log('\nSummary:');
    console.log(response.data.summary);
    console.log('\nQuestion:');
    console.log(response.data.question);
    console.log('===================');
    console.log('\nAPI test completed successfully!');
    
  } catch (error) {
    console.error('Error testing Active Listener API:', error.response?.data || error.message);
    console.log('Please make sure the server is running and your API key is valid.');
  }
}

// Run the test
testActiveListener();