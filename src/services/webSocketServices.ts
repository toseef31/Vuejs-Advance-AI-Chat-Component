import { getMockResponse } from "@/mock/mockApi";

let onMessageCallback: ((message: string) => void) | null = null;

export const connectWebSocket = (onMessage: (message: string) => void) => {
  onMessageCallback = onMessage;
  console.log("Mock WebSocket connected");
};

export const sendMessage = (message: string) => {
  console.log("Mock send:", message);
  setTimeout(() => {
    const reply = getMockResponse(message);
    if (onMessageCallback) onMessageCallback(reply);
  }, 500);
};
