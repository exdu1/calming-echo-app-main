async function testActiveListenerFetch() {
  try {
    console.log("Testing Active Listener API endpoint using fetch() API.");
    
    const testMessage = "I've been feeling stressed about work lately. My boss keeps setting unrealistic deadlines, and I'm struggling to maintain a good work-life balance. I'm also trying to build my portfolio so I can transition to a software developer job, but I'm using AI so much that I have imposter syndrome. I can't just sit down and WRITE code without opening AI. There's just too much to learn.";

    const history = [
      {
        text: "Hey, I need to talk.",
        isUser: true,
      },
      {
        text: "I'm here to listen. What's going on?",
        isUser: false,
      },
    ];

    const response = await fetch("http://localhost:3001/api/active-listener", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: testMessage,
        history: history,
      }),
    });

    // Check headers
    console.log("Status:", response.status);
    console.log(
      "Content-Type:",
      response.headers.get("content-type")
    );
    console.log(
      "Cache-Control:",
      response.headers.get("cache-control")
    );
    console.log();
 
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error:", errorText);
      return;
    }

    // Read the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let chunkCount = 0;
    let fullText = "";

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      chunkCount++;
      const text = decoder.decode(value, {
        stream: true,
      });
      fullText += text;

      console.log(`--- Chunk ${chunkCount} ---`);
      console.log(text);
    }
    
    // ─── Summary ───
    console.log("\n===================");
    console.log("Total chunks:", chunkCount);
    console.log("\nFull response:");
    console.log(fullText);
    console.log("===================");
    console.log("\nStream test passed!\n");
    
  } catch (error) {
    console.error("Stream test failed:", error.message);
    console.log(
      "Make sure the server is running on port 3001."
    );
  }
};

//Run test
testActiveListenerFetch();