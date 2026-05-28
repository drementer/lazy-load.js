export default class {
  #events = new Map();

  #isValidEventName(eventName) {
    if (typeof eventName !== 'string') {
      console.warn('Event name must be a string');
      return false;
    }

    return true;
  }

  #isValidCallback(callback) {
    if (typeof callback !== 'function') {
      console.warn('Callback must be a function');
      return false;
    }

    return true;
  }

  #validateListenerParams(eventName, callback) {
    return this.#isValidEventName(eventName) && this.#isValidCallback(callback);
  }

  #getOrCreateListeners(eventName) {
    if (!this.#events.has(eventName)) {
      this.#events.set(eventName, []);
    }

    return this.#events.get(eventName);
  }

  // Read-only view for debugging/tests. Each value is a new array so external
  // code cannot alter internal listeners (e.g. events['loaded'].push(fn)).
  #snapshotEvents() {
    const snapshot = {};

    for (const [eventName, listeners] of this.#events) {
      snapshot[eventName] = [...listeners];
    }

    return snapshot;
  }

  on(eventName, callback) {
    if (!this.#validateListenerParams(eventName, callback)) return this;

    this.#getOrCreateListeners(eventName).push(callback);
    return this;
  }

  off(eventName, callback) {
    if (!this.#validateListenerParams(eventName, callback)) return this;

    if (!this.#events.has(eventName)) return this;

    const listeners = this.#events
      .get(eventName)
      .filter((listener) => listener !== callback);

    this.#events.set(eventName, listeners);
    return this;
  }

  once(eventName, callback) {
    if (!this.#validateListenerParams(eventName, callback)) return this;

    const oneTimeListener = (...args) => {
      callback(...args);
      this.off(eventName, oneTimeListener);
    };

    return this.on(eventName, oneTimeListener);
  }

  emit(eventName, ...args) {
    if (!this.#isValidEventName(eventName)) return false;

    const handlers = this.#events.get(eventName);
    if (!handlers?.length) return false;

    handlers.forEach((handler) => handler(...args));
    return true;
  }

  get events() {
    return this.#snapshotEvents();
  }
}
