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

export const connectWebSocket = async (options: WebSocketInitOptions) => {
  const store = useSessionStore();

  store.setConnectionStatus("connecting");
  store.setDebugPanelEnabled(!!options.debugPanelEnabled);
  store.setAuthEnabled(!!options.authEnabled);
  options.onStatusChange?.("connecting");

  onMessageCallback = options.onMessage || null;
  onSignalCallback = options.onSignal || null;

  store.initSession();

  setTimeout(async () => {
    try {
      let authToken: string | undefined;
      if (options.authEnabled && options.authTokenProvider) {
        try {
          authToken = await options.authTokenProvider.getToken();
        } catch (error) {
          console.error("Failed to get auth token:", error);
          const errorSignal: Signal = {
            signal: "error",
            sessionId: store.sessionId || "unknown",
            timestamp: new Date().toISOString(),
            data: { code: "authentication_error" },
          };
          onSignalCallback?.(errorSignal);
          store.setConnectionStatus("disconnected");
          options.onStatusChange?.("disconnected");
          return;
        }
      }

      store.setConnected(true);
      options.onStatusChange?.("connected");

      const initSignal: Signal = {
        signal: "session_initialized",
        sessionId: store.sessionId,
        timestamp: new Date().toISOString(),
      };
      onSignalCallback?.(initSignal);

      // Start mock ping
      if (mockConnectionInterval) clearInterval(mockConnectionInterval);
      mockConnectionInterval = setInterval(() => {
        if (!store.isConnected) return;
        const signal: Signal = {
          signal: "session_ping",
          sessionId: store.sessionId,
          timestamp: new Date().toISOString(),
        };
        onSignalCallback?.(signal);
      }, 10000);

    } catch (err) {
      console.error("WebSocket mock connection error", err);
    }
  }, 500);
};

export const disconnectWebSocket = () => {
  const store = useSessionStore();
  store.setConnected(false);
  if (mockConnectionInterval) clearInterval(mockConnectionInterval);
};

export const sendCommand = (command: Command) => {
  const store = useSessionStore();

  if (command.command === "send_message") {
    const mockMessages = getMockResponse(command.data);
    onMessageCallback?.(mockMessages);
    store.addServerMessages(mockMessages);
  }

  if (command.command === "initialize_session") {
    store.setSessionId(command.sessionId || `mock-session-${Date.now()}`);
  }
};

export const sendSignal = (signal: Signal) => {
  const store = useSessionStore();
  onSignalCallback?.(signal);
  console.log("Signal sent:", signal);
  console.log("Store:", store);
};
