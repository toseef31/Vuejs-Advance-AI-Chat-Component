import { defineStore } from "pinia";

type Message = {
  text: string;
  sender: "user" | "server";
};

export const useSessionStore = defineStore("session", {
  state: () => ({
    messages: [] as Message[],
    sessionId: "",
    isConnected: false,
  }),
  actions: {
    addMessage(msg: string, sender: "user" | "server") {
      this.messages.push({ text: msg, sender });
    },
    setConnected(status: boolean) {
      this.isConnected = status;
    },
    initSession() {
      let existing = localStorage.getItem("sessionId");
      if (!existing) {
        existing = crypto.randomUUID();
        localStorage.setItem("sessionId", existing);
      }
      this.sessionId = existing;
    },
  },
});
