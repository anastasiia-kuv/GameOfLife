import Checkers from './Checkers';

class EventObserver extends Checkers {
  constructor() {
    super();
    this.emitter = null;
    this.observers = [];
  }

  subscribe(subscriber) {
    this.observers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.observers.slice(this.observers.indexOf(subscriber), 1);
  }

  addEmitter(name) {
    this.emitter = name;
  }

  notify(name, ...data) {
    this.observers.forEach(subscriber => super.hasAvailable(
      this.emitter, subscriber.getClassName(), name,
    ) && subscriber[name](data[0]));
  }
}

export default EventObserver;
