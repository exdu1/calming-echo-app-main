async function testActiveListenerFetch() {
  try {
    console.log("Testing Active Listener API endpoint using fetch() API.");
    
    const testMessage = "I've been feeling stressed about work lately. My boss keeps setting unrealistic deadlines, and I'm struggling to maintain a good work-life balance.";

    const response = await fetch("http://localhost:3001/api/active-listener", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: testMessage,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // some shit didn't work
  }
};


//Run test
testActiveListenerFetch();