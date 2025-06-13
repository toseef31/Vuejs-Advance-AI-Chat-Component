import { defineStore } from "pinia";
import type { ChatMessage } from "./sessionStore";

export const useHistoryStore = defineStore("history", {
  state: () => ({
    sessions: {} as Record<string, ChatMessage[]>,
  }),

  actions: {
    addSession(sessionId: string, messages: ChatMessage[]) {
      if (!sessionId || messages.length === 0) return;
      console.log("[historyStore] Adding session:", sessionId);
      this.sessions[sessionId] = [...messages];
    },

    getAllSessionIds(): string[] {
      return Object.keys(this.sessions);
    },

    getMessagesBySession(sessionId: string): ChatMessage[] {
      return this.sessions[sessionId] || [];
    },

    clearAllSessions() {
      this.sessions = {};
    },
  },
});
