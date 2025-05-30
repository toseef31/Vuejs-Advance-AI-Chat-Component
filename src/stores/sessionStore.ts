import { defineStore } from "pinia";

export type ChatMessage = {
  id: string;
  sender: "user" | "server";
  type: string;
  format?: string;
  content: any;
  timestamp: string;
};

export const useSessionStore = defineStore("session", {
  state: () => ({
    messages: [] as ChatMessage[],
    sessionId: "",
    isConnected: false,
    showReasoning: false,
    debugPanelEnabled: false,
  }),
  actions: {
    addMessage(msg: Omit<ChatMessage, "id" | "timestamp">) {
      this.messages.push({
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        ...msg,
      });
    },
    clearMessages() {
      this.messages = [];
    },
    setConnected(status: boolean) {
      this.isConnected = status;
    },
    initSession(sessionIdKey = "sessionId") {
      let existing = localStorage.getItem(sessionIdKey);
      if (!existing) {
        existing = crypto.randomUUID();
        localStorage.setItem(sessionIdKey, existing);
        console.log("New session ID created:", existing);
      } else {
        console.log("Session restored:", existing);
      }
      this.sessionId = existing;
    },
    endSession(sessionIdKey = "sessionId") {
      localStorage.removeItem(sessionIdKey);
      this.sessionId = "";
      this.clearMessages();
    },
  },
});
