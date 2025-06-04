import { getMockResponse } from "@/mock/mockApi";
import { useSessionStore, type Command, type Signal, type ChatMessage } from "@/stores/sessionStore";

export interface AuthTokenProvider {
  getToken(): Promise<string> | string;
}

export type WebSocketInitOptions = {
  onMessage?: (messages: ChatMessage[]) => void;
  onSignal?: (signal: Signal) => void;
  onStatusChange?: (status: "connecting" | "connected" | "disconnected") => void;
  workflowId?: string;
  authEnabled?: boolean;
  authTokenProvider?: AuthTokenProvider;
  debugPanelEnabled?: boolean;
};

let onMessageCallback: ((messages: ChatMessage[]) => void) | null = null;
let onSignalCallback: ((signal: Signal) => void) | null = null;
let mockConnectionInterval: NodeJS.Timeout | null = null;

export const connectWebSocket = async ({
  onMessage,
  onSignal,
  onStatusChange,
  workflowId = "default",
  authEnabled = false,
  authTokenProvider,
  debugPanelEnabled = false,
}: WebSocketInitOptions) => {
  const store = useSessionStore();

  console.log("Connecting to Terminal WebSocket...");
  store.setConnectionStatus("connecting");
  store.setDebugPanelEnabled(debugPanelEnabled);
  store.setAuthEnabled(authEnabled);
  onStatusChange?.("connecting");

  onMessageCallback = onMessage || null;
  onSignalCallback = onSignal || null;

  store.initSession();

  setTimeout(async () => {
    try {
      let authToken: string | undefined;
      if (authEnabled && authTokenProvider) {
        try {
          authToken = await authTokenProvider.getToken();
        } catch (error) {
          console.error("Failed to get auth token:", error);
          const errorSignal: Signal = {
            signal: "error",
            sessionId: store.sessionId || "unknown",
            timestamp: new Date().toISOString(),
            data: {
              code: "authentication_error"
            }
          };
          onSignalCallback?.(errorSignal);
          store.setConnectionStatus("disconnected");
          onStatusChange?.("disconnected");
          return;
        }
      }

      const initCommand = store.createCommand("initialize_session", {
        ...(store.sessionId && { sessionId: store.sessionId }),
        workflowId,
        ...(authToken && { authToken }),
      });

      console.log("Sending initialize_session command:", initCommand);

      setTimeout(() => {
        store.setConnectionStatus("connected");
        onStatusChange?.("connected");

        const isNewSession = !store.sessionId;
        const sessionId = store.sessionId || `session-${crypto.randomUUID()}`;

        if (isNewSession) {
          const initSignal: Signal = {
            signal: "session_initialized",
            sessionId,
            timestamp: new Date().toISOString(),
            data: {
              workflowId
            }
          };

          store.setSessionId(sessionId);
          store.setWorkflow(workflowId);
          onSignalCallback?.(initSignal);

          console.log("New session initialized:", sessionId);
        } else {
          const restoreSignal: Signal = {
            signal: "session_restored",
            sessionId: store.sessionId,
            timestamp: new Date().toISOString()
          };

          onSignalCallback?.(restoreSignal);
          console.log("Session restored:", store.sessionId);
        }

        // Start periodic connection status signals
        startConnectionStatusHeartbeat();

      }, 1000);

    } catch (error) {
      console.error("Connection failed:", error);
      store.setConnectionStatus("disconnected");
      onStatusChange?.("disconnected");
    }
  }, 500);
};

export const sendMessage = (text: string, file?: { name: string; type: string; content: string }) => {
  const store = useSessionStore();

  if (!store.isConnected || store.isBlocked) {
    console.warn("Cannot send message: not connected or blocked");
    return;
  }

  const command = store.createCommand("send_message", {
    text,
    ...(file && { file }),
  });

  console.log("Sending message command:", command);

  store.addUserMessage(text, file);

  setTimeout(() => {
    const processingSignal: Signal = {
      signal: "processing_started",
      sessionId: store.sessionId,
      timestamp: new Date().toISOString(),
    };
    onSignalCallback?.(processingSignal);
    store.setProcessing(true);

    setTimeout(() => {
      const responses = getMockResponse({ content: text });

      if (onMessageCallback) {
        onMessageCallback(responses);
      }

      setTimeout(() => {
        const completeSignal: Signal = {
          signal: "processing_complete",
          sessionId: store.sessionId,
          timestamp: new Date().toISOString(),
        };
        onSignalCallback?.(completeSignal);
        store.setProcessing(false);
      }, 100);

    }, Math.random() * 2000 + 1000);
  }, 100);
};

export const fetchMessages = (before?: string, limit: number = 20) => {
  const store = useSessionStore();

  if (!store.isConnected) {
    console.warn("Cannot fetch messages: not connected");
    return;
  }

  const command = store.createCommand("fetch_messages", {
    ...(before && { before }),
    limit,
  });

  console.log("Fetching messages:", command);

  setTimeout(() => {
    const historicalMessages: ChatMessage[] = [
      {
        id: crypto.randomUUID(),
        type: "response",
        sessionId: store.sessionId,
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        content: {
          format: "markdown",
          body: "Welcome back! This is a historical message from your previous session."
        }
      },
      {
        id: crypto.randomUUID(),
        type: "user_message",
        sessionId: store.sessionId,
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        content: {
          text: "Hello, I had a question earlier."
        }
      }
    ];

    if (onMessageCallback) {
      onMessageCallback(historicalMessages);
    }
  }, 500);
};

// export const disconnectWebSocket = (onStatusChange?: (status: "disconnected") => void) => {
//   const store = useSessionStore();

//   console.log("WebSocket disconnected");

//   onMessageCallback = null;
//   onSignalCallback = null;

//   if (mockConnectionInterval) {
//     clearInterval(mockConnectionInterval);
//     mockConnectionInterval = null;
//   }

//   store.setConnectionStatus("disconnected");
//   onStatusChange?.("disconnected");
// };
export const disconnectWebSocket = () => {
  if (mockConnectionInterval) clearInterval(mockConnectionInterval);
  mockConnectionInterval = null;
  onMessageCallback = null;
  onSignalCallback = null;
  const store = useSessionStore();
  store.setConnectionStatus("disconnected");
};

export const simulateSignal = (signalType: string, data?: any) => {
  const store = useSessionStore();

  const signal: Signal = {
    signal: signalType,
    sessionId: store.sessionId,
    timestamp: new Date().toISOString(),
    data,
  };

  console.log("Simulating signal:", signal);
  onSignalCallback?.(signal);
};

const startConnectionStatusHeartbeat = () => {
  const store = useSessionStore();

  mockConnectionInterval = setInterval(() => {
    if (store.isConnected && !store.isBlocked) {
      const statusSignal: Signal = {
        signal: "connection_status",
        sessionId: store.sessionId,
        timestamp: new Date().toISOString(),
        data: {
          status: "connected"
        }
      };
      onSignalCallback?.(statusSignal);
    }
  }, 5000);
};

export const simulateSessionEnd = () => {
  simulateSignal("session_ended");
};

export const simulateSessionExpiry = () => {
  simulateSignal("session_expired");
};

export const simulateLimitExceeded = () => {
  simulateSignal("limit_exceeded", {
    resetTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  });
};

export const simulateBlocked = () => {
  simulateSignal("blocked");
};

export const simulateError = (code: string = "generic_error") => {
  simulateSignal("error", { code });
};
