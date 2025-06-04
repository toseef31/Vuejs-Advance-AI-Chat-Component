import { defineStore } from "pinia";

export type ChatMessage = {
  id: string;
  type: "response" | "debug" | "reasoning" | "user_message";
  sessionId: string;
  timestamp: string;
  content: {
    format?: "text" | "markdown" | "json";
    body?: string;
    text?: string;
    level?: string;
    file?: {
      name: string;
      type: string;
      content: string;
    };
  };
};

export type Command = {
  command: "initialize_session" | "send_message" | "fetch_messages";
  sessionId?: string;
  timestamp: string;
  data: any;
};

// Signal structure
export type Signal = {
  signal: string;
  sessionId: string;
  timestamp: string;
  data?: any;
};

export const useSessionStore = defineStore("session", {
  state: () => ({
    messages: [] as ChatMessage[],
    sessionId: "",
    isConnected: false,
    connectionStatus: "disconnected" as "connecting" | "connected" | "disconnected",
    showReasoning: false,
    debugPanelEnabled: false,
    sessionInitMessage: "",
    isProcessing: false,
    isBlocked: false,
    limitExceeded: false,
    resetTime: null as string | null,
    workflowId: "",
    authEnabled: false,
  }),

  getters: {
    userMessages: (state) => state.messages.filter(m => m.type === "user_message"),
    responseMessages: (state) => state.messages.filter(m => m.type === "response"),
    reasoningMessages: (state) => state.messages.filter(m => m.type === "reasoning"),
    debugMessages: (state) => state.messages.filter(m => m.type === "debug"),
    sortedMessages: (state) => [...state.messages].sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ),
  },

  actions: {
    addMessage(msg: Omit<ChatMessage, "id">) {
      this.messages.push({
        id: msg.id || crypto.randomUUID(),
        ...msg,
      });
    },

    // Add user message
    addUserMessage(text: string, file?: { name: string; type: string; content: string }) {
      const message: ChatMessage = {
        id: crypto.randomUUID(),
        type: "user_message",
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        content: {
          text,
          ...(file && { file }),
        },
      };
      this.messages.push(message);
    },

    addServerMessages(messages: ChatMessage[]) {
      messages.forEach(msg => {
        // Ensure message has all required fields
        const completeMessage: ChatMessage = {
          ...msg,
          sessionId: msg.sessionId || this.sessionId,
        };
        this.messages.push(completeMessage);
      });
    },

    prependHistoricalMessages(messages: ChatMessage[]) {
      const sortedMessages = messages.sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      this.messages.unshift(...sortedMessages);
    },

    clearMessages() {
      this.messages = [];
    },

    setConnected(status: boolean) {
      this.isConnected = status;
      this.connectionStatus = status ? "connected" : "disconnected";
    },

    setConnectionStatus(status: "connecting" | "connected" | "disconnected") {
      this.connectionStatus = status;
      this.isConnected = status === "connected";
    },

    initSession(sessionIdKey = "terminal_session_id") {
      const existing = localStorage.getItem(sessionIdKey);
      if (existing) {
        console.log("Session restored from localStorage:", existing);
        this.sessionId = existing;
      } else {
        console.log("No existing session found");
        this.sessionId = "";
      }
    },

    setSessionId(sessionId: string, sessionIdKey = "terminal_session_id") {
      this.sessionId = sessionId;
      localStorage.setItem(sessionIdKey, sessionId);
      console.log("Session ID saved:", sessionId);
    },

    endSession(sessionIdKey = "terminal_session_id") {
      localStorage.removeItem(sessionIdKey);
      this.sessionId = "";
      this.setConnected(false);
      this.isProcessing = false;
      this.isBlocked = false;
      this.limitExceeded = false;
      this.resetTime = null;
    },

    expireSession(sessionIdKey = "terminal_session_id") {
      localStorage.removeItem(sessionIdKey);
      this.sessionId = "";
      this.setConnected(false);
      this.isProcessing = false;
      this.clearMessages();
    },

    restoreSession(sessionId: string) {
      this.sessionId = sessionId;
      console.log("Session restored:", sessionId);
    },

    setProcessing(isProcessing: boolean) {
      this.isProcessing = isProcessing;
    },

    blockSession() {
      this.isBlocked = true;
      this.setConnected(false);
    },

    setLimitExceeded(resetTime?: string) {
      this.limitExceeded = true;
      this.resetTime = resetTime || null;
    },

    clearLimitExceeded() {
      this.limitExceeded = false;
      this.resetTime = null;
    },

    setWorkflow(workflowId: string) {
      this.workflowId = workflowId;
    },

    toggleShowReasoning() {
      this.showReasoning = !this.showReasoning;
    },

    setDebugPanelEnabled(enabled: boolean) {
      this.debugPanelEnabled = enabled;
    },

    setSessionInitMessage(msg: string) {
      this.sessionInitMessage = msg;
    },

    setAuthEnabled(enabled: boolean) {
      this.authEnabled = enabled;
    },

    getEarliestTimestamp(): string | null {
      if (this.messages.length === 0) return null;
      const sorted = [...this.messages].sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      return sorted[0].timestamp;
    },

    createCommand(command: Command["command"], data: any = {}): Command {
      return {
        command: command as any,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        data,
      };
    },
  },
});
// import { defineStore } from "pinia";

// export type ChatMessage = {
//   id: string;
//   sender: "user" | "server";
//   type: string;
//   format?: string;
//   content: any;
//   timestamp: string;
// };

// export const useSessionStore = defineStore("session", {
//   state: () => ({
//     messages: [] as ChatMessage[],
//     sessionId: "",
//     isConnected: false,
//     connectionStatus: "disconnected" as "connecting" | "connected" | "disconnected",
//     showReasoning: false,
//     debugPanelEnabled: false,
//     sessionInitMessage: "",
//   }),
//   getters: {
//     userMessages: (state) => state.messages.filter(m => m.sender === "user"),
//     serverMessages: (state) => state.messages.filter(m => m.sender === "server"),
//     reasoningMessages: (state) => state.messages.filter(m => m.type === "reasoning"),
//     debugMessages: (state) => state.messages.filter(m => m.type === "debug"),
//   },
//   actions: {
//     addMessage(msg: Omit<ChatMessage, "id" | "timestamp">) {
//       this.messages.push({
//         id: crypto.randomUUID(),
//         timestamp: new Date().toISOString(),
//         ...msg,
//       });
//     },
//     clearMessages() {
//       this.messages = [];
//     },
//     setConnected(status: boolean) {
//       this.isConnected = status;
//       this.connectionStatus = status ? "connected" : "disconnected";
//     },
//     setConnectionStatus(status: "connecting" | "connected" | "disconnected") {
//       this.connectionStatus = status;
//     },
//     initSession(sessionIdKey = "sessionId") {
//       let existing = localStorage.getItem(sessionIdKey);
//       if (!existing) {
//         existing = crypto.randomUUID();
//         localStorage.setItem(sessionIdKey, existing);
//         console.log("New session ID created:", existing);
//       } else {
//         console.log("Session restored:", existing);
//       }
//       this.sessionId = existing;
//     },
//     endSession(sessionIdKey = "sessionId") {
//       localStorage.removeItem(sessionIdKey);
//       this.sessionId = "";
//       this.clearMessages();
//       this.setConnected(false);
//     },
//     toggleShowReasoning() {
//       this.showReasoning = !this.showReasoning;
//     },
//     setSessionInitMessage(msg: string) {
//       this.sessionInitMessage = msg;
//     },
//   },
// });
