export default class {
  #events = new Map();

  #validateParams(eventName, callback) {
    if (typeof eventName !== 'string') {
      return console.warn('Event name must be a string');
    }
    if (typeof callback !== 'function') {
      return console.warn('Callback must be a function');
    }
  }

  on(eventName, callback) {
    this.#validateParams(eventName, callback);

    if (!this.#events.has(eventName)) {
      this.#events.set(eventName, []);
    }
    this.#events.get(eventName).push(callback);
    return this;
  }

  off(eventName, callback) {
    this.#validateParams(eventName, callback);

    if (!this.#events.has(eventName)) return this;

    const listeners = this.#events.get(eventName);
    this.#events.set(
      eventName,
      listeners.filter((listener) => listener !== callback)
    );
    return this;
  }

  once(eventName, callback) {
    const oneTimeListener = (...args) => {
      callback(...args);
      this.off(eventName, oneTimeListener);
    };

    return this.on(eventName, oneTimeListener);
  }

  emit(eventName, ...args) {
    if (typeof eventName !== 'string') {
      return console.warn('Event name must be a string');
    }

    const handlers = this.#events.get(eventName);
    if (!handlers?.length) return false;

    handlers.forEach((callback) => callback(...args));
    return true;
  }

  get events() {
    return Object.fromEntries(this.#events);
  }
}
