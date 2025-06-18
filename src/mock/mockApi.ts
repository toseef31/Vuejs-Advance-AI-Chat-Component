import type { ChatMessage } from "@/stores/sessionStore";
import { useSessionStore } from "@/stores/sessionStore";

export const getMockResponse = (msg: { content: string }): ChatMessage[] => {
  const sessionId = `mock-session-${Date.now()}`;
  const responses: ChatMessage[] = [];
  const sessoinStore = useSessionStore()

  const createMessage = (
    type: "response" | "debug" | "reasoning",
    content: { body?: string; text?: string; level?: string },
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
    const getRandomImage = () => `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 10000)}`;
    responses.push(
      createMessage(
        "response",
        {
          body: JSON.stringify(
            {
              type: "carousel",
              cards: [
                {
                  title: "Card One",
                  description: "First card description",
                  img: getRandomImage(),
                },
                {
                  title: "Card Two",
                  description: "Second card description",
                  img: getRandomImage(),
                },
              ],
            },
            null,
            2
          ),
        },
        "json"
      )
    );
    return responses;
  }

  if (input.includes("quick") || input.includes("options")) {
    responses.push(
      createMessage(
        "response",
        {
          body: JSON.stringify(
            {
              type: "quick_reply",
              replies: [
                { text: "Option A", payload: "option_a" },
                { text: "Option B", payload: "option_b" },
                { text: "Option C", payload: "option_c" },
              ],
            },
            null,
            2
          ),
        },
        "json"
      )
    );
    return responses;
  }

  if (input.includes("reasoning") && sessoinStore.showReasoning) {
    responses.push(
      createMessage("reasoning", { body: "This is a reasoning trace for the agent's decision-making." })
    );
    // return responses;
  }

  if (input.includes("debug")) {
    responses.push(
      createMessage("debug", { text: "Debug: Token usage - Prompt: 1024, Completion: 256", level: "info" })
    );
    return responses;
  }
  if (input.includes("markdown")) {
    responses.push(
      createMessage(
        "response",
        {
          text: `**Hello!** This is a _markdown_ **formatted** reply.\n\n- Item 1\n- Item 2\n\n[Visit Google](https://google.com)`
        },
        "markdown"
      )
    )
    return responses
  }

  // Default mock response
  responses.push(createMessage("response", { text: "This is a mock agent reply." }));
  return responses;
};
