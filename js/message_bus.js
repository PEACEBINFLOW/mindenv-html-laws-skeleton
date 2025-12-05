// js/message_bus.js

export class MessageBus {
  constructor() {
    this.handlers = {};
  }

  on(type, handler) {
    if (!this.handlers[type]) this.handlers[type] = [];
    this.handlers[type].push(handler);
  }

  emit(type, payload = {}) {
    const list = this.handlers[type] || [];
    for (const h of list) {
      try {
        h(payload);
      } catch (err) {
        console.error("Message handler error:", err);
      }
    }
  }
}
