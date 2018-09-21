class EventObserver {
  constructor(){
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  notify(...data){
    this.observers.forEach(subscriber => subscriber(...data));
  }
}

export default EventObserver;
