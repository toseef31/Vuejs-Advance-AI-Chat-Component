export type MockResponse = {
  type: string;
  format?: string;
  content: any;
  timestamp: string;
  level?: string;
  severity?: string;
};

export const getMockResponse = (msg: { content: string }): MockResponse => {
  const base = {
    timestamp: new Date().toISOString(),
  };

  if (msg.content.includes("carousel")) {
    return {
      ...base,
      type: "carousel",
      format: "json",
      content: {
        cards: [
          {
            title: "Card One",
            description: "This is the first card",
            image: "https://via.placeholder.com/150",
            buttons: [{ text: "View", payload: "view_1" }],
          },
          {
            title: "Card Two",
            description: "This is the second card",
            image: "https://via.placeholder.com/150",
            buttons: [{ text: "Open", payload: "open_2" }],
          },
        ],
      },
    };
  }

  if (msg.content.includes("quick")) {
    return {
      ...base,
      type: "quick_reply",
      format: "json",
      content: {
        replies: [
          { text: "Option A", payload: "a" },
          { text: "Option B", payload: "b" },
        ],
      },
    };
  }

  if (msg.content.includes("reasoning")) {
    return {
      ...base,
      type: "reasoning",
      format: "text",
      content: "The AI considered various factors including X, Y, Z...",
    };
  }

  if (msg.content.includes("debug")) {
    return {
      ...base,
      type: "debug",
      format: "text",
      level: "info",
      content: "This is a debug message from the system.",
    };
  }

  if (msg.content.includes("error")) {
    return {
      ...base,
      type: "error",
      severity: "high",
      content: "A system error occurred. Please try again later.",
    };
  }

  return {
    ...base,
    type: "system_response",
    format: "markdown",
    content: `Echo: **${msg.content}**`,
  };
};
