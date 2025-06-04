import type { ChatMessage } from "@/stores/sessionStore";

export const getMockResponse = (msg: { content: string }): ChatMessage[] => {
  const sessionId = `session-${Date.now()}`;
  const responses: ChatMessage[] = [];

  const createMessage = (
    type: "response" | "debug" | "reasoning",
    content: any,
    format: "text" | "markdown" | "json" = "text",
    offsetMs: number = 0
  ): ChatMessage => ({
    id: crypto.randomUUID(),
    type,
    sessionId,
    timestamp: new Date(Date.now() + offsetMs).toISOString(),
    content: {
      format,
      ...content,
    },
  });

  const input = msg.content.toLowerCase();

  if (input.includes("carousel")) {
    responses.push(createMessage("response", {
      body: JSON.stringify({
        type: "carousel",
        cards: [
          {
            title: "Card One",
            description: "First card description",
            image: "https://via.placeholder.com/300x200",
            buttons: [
              { text: "View", payload: "view_1" },
              { text: "Select", payload: "select_1" }
            ],
          },
          {
            title: "Card Two",
            description: "Second card description",
            image: "https://via.placeholder.com/300x200",
            buttons: [
              { text: "Details", payload: "details_2" },
              { text: "Choose", payload: "choose_2" }
            ],
          },
        ],
      }, null, 2)
    }, "json"));

    return responses;
  }

  if (input.includes("quick") || input.includes("options")) {
    responses.push(createMessage("response", {
      body: JSON.stringify({
        type: "quick_reply",
        replies: [
          { text: "Option A", payload: "option_a" },
          { text: "Option B", payload: "option_b" },
          { text: "Option C", payload: "option_c" },
        ],
      }, null, 2)
    }, "json"));

    return responses;
  }

  if (input.includes("reasoning")) {
    responses.push(createMessage("reasoning", {
      body: "Processing request step by step...",
    }, "text", 100));

    responses.push(createMessage("reasoning", {
      body: "Analyzing input parameters and context...",
    }, "text", 300));

    responses.push(createMessage("reasoning", {
      body: "Generating appropriate response format...",
    }, "text", 500));

    responses.push(createMessage("response", {
      body: `Echo: **${msg.content}**`,
    }, "markdown", 700));

    return responses;
  }

  if (input.includes("debug")) {
    responses.push(createMessage("debug", {
      body: `Processing input: "${msg.content}"`,
      level: "info",
    }, "text"));

    responses.push(createMessage("debug", {
      body: `Input length: ${msg.content.length} characters`,
      level: "info",
    }, "text", 100));

    responses.push(createMessage("response", {
      body: `Echo: **${msg.content}**`,
    }, "markdown", 200));

    responses.push(createMessage("debug", {
      body: "Response generated successfully",
      level: "success",
    }, "text", 300));

    return responses;
  }

  if (input.includes("error")) {
    responses.push(createMessage("debug", {
      body: "Simulating error condition",
      level: "warning",
    }, "text"));

    responses.push(createMessage("response", {
      body: "Error simulation triggered",
    }, "text", 200));

    responses.push(createMessage("debug", {
      body: "Error condition processed",
      level: "error",
    }, "text", 300));

    return responses;
  }

  responses.push(createMessage("response", {
    body: `Echo: **${msg.content}**`,
  }, "markdown"));

  return responses;
};

// export type MockResponse = {
//   type: string;
//   format?: string;
//   content: any;
//   timestamp: string;
//   level?: string;
//   severity?: string;
// };

// export const getMockResponse = (msg: { content: string }): MockResponse => {
//   const base = {
//     timestamp: new Date().toISOString(),
//   };

//   if (msg.content.includes("carousel")) {
//     return {
//       ...base,
//       type: "carousel",
//       format: "json",
//       content: {
//         cards: [
//           {
//             title: "Card One",
//             description: "This is the first card",
//             image: "https://via.placeholder.com/150",
//             buttons: [{ text: "View", payload: "view_1" }],
//           },
//           {
//             title: "Card Two",
//             description: "This is the second card",
//             image: "https://via.placeholder.com/150",
//             buttons: [{ text: "Open", payload: "open_2" }],
//           },
//         ],
//       },
//     };
//   }

//   if (msg.content.includes("quick")) {
//     return {
//       ...base,
//       type: "quick_reply",
//       format: "json",
//       content: {
//         replies: [
//           { text: "Option A", payload: "a" },
//           { text: "Option B", payload: "b" },
//         ],
//       },
//     };
//   }

//   if (msg.content.includes("reasoning")) {
//     return {
//       ...base,
//       type: "reasoning",
//       format: "text",
//       content: "The AI considered various factors including X, Y, Z...",
//     };
//   }

//   if (msg.content.includes("debug")) {
//     return {
//       ...base,
//       type: "debug",
//       format: "text",
//       level: "info",
//       content: "This is a debug message from the system.",
//     };
//   }

//   if (msg.content.includes("error")) {
//     return {
//       ...base,
//       type: "error",
//       severity: "high",
//       content: "A system error occurred. Please try again later.",
//     };
//   }

//   return {
//     ...base,
//     type: "system_response",
//     format: "markdown",
//     content: `Echo: **${msg.content}**`,
//   };
// };
