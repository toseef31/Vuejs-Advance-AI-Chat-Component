import { getMockResponse, type MockResponse } from "@/mock/mockApi";

type WebSocketInitOptions = {
  onMessage: (msg: MockResponse) => void;
  sessionId: string;
  workflowId?: string;
  onInit?: (info: { type: string; sessionId: string }) => void;
};

let onMessageCallback: ((msg: MockResponse) => void) | null = null;

export const connectWebSocket = ({
  onMessage,
  sessionId,
  // workflowId,
  onInit,
}: WebSocketInitOptions) => {
  onMessageCallback = onMessage;
  console.log("Connecting to mock WebSocket…");

  setTimeout(() => {
    console.log("Connected");
    onInit?.({
      type: sessionId ? "session_restored" : "session_initialized",
      sessionId,
    });

    onMessage({
      type: "system_response",
      format: "markdown",
      content: `Welcome back! Session ID: **${sessionId}**`,
      timestamp: new Date().toISOString(),
    });
  }, 800);
};

export const sendMessage = (msg: { content: string }) => {
  console.log("Mock send:", msg);
  setTimeout(() => {
    const response = getMockResponse(msg);
    if (onMessageCallback) onMessageCallback(response);
  }, 1000);
};

export const disconnectWebSocket = () => {
  console.log("WebSocket disconnected");
  onMessageCallback = null;
};
