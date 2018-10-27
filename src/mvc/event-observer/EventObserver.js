class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(subscriber) {
    this.observers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.observers.slice(this.observers.indexOf(subscriber), 1);
  }

  notify(name, ...data) {
    this.observers.forEach(subscriber => subscriber[name] && subscriber[name](data[0]));
  }
}

export default EventObserver;
